import cn from 'classnames';
import { useDeferredValue, useMemo, useRef } from 'react';

import { PlusSVG } from '@sbercloud/uikit-product-icons';
import { LAYOUT_TYPE } from '@sbercloud/uikit-product-utils';
import { ButtonTonal } from '@snack-uikit/button';
import { Scroll } from '@snack-uikit/scroll';
import { Tag } from '@snack-uikit/tag';
import { TruncateString } from '@snack-uikit/truncate-string';
import { Typography } from '@snack-uikit/typography';

import { PLATFORM } from '../../constants';
import { useCalculatorContext } from '../../contexts';
import { useProductClick, useProductDelete } from '../../hooks';
import { formatNumber, getPrice, parseKeyToDataTest } from '../../utils';
import { PricePeriodSelect, ProductCard, ProductListActions } from './components';
import { useScrollListToActiveProduct } from './hooks';
import styles from './styles.module.scss';
import { getTotalPrice, transformValueToProductCardData } from './utils';

type PriceSummaryProps = {
  className?: string;
};

const PlatformSale = {
  [PLATFORM.Evolution]: 25,
  [PLATFORM.Advanced]: 25,
  [PLATFORM.VmWare]: 20,
};

export function PriceSummary({ className }: PriceSummaryProps) {
  const {
    layoutType,
    pricePeriod,
    setCatalogOpen,
    calculatorType,
    selectedProduct,
    products,
    config: { products: productsProp, platforms },
    actions: { onCatalogOpen },
  } = useCalculatorContext();
  const isMobile = layoutType !== LAYOUT_TYPE.Desktop && layoutType !== LAYOUT_TYPE.DesktopSmall;
  const isPartners = calculatorType === 'partners';
  const TitleComponent = isMobile ? Typography.SansTitleL : Typography.SansHeadlineS;

  const total = getPrice({ price: getTotalPrice(products), pricePeriod, partners: isPartners });
  const productCards = useMemo(() => transformValueToProductCardData(productsProp, products), [products, productsProp]);

  const hasPayaGo = useMemo(() => {
    const payaProducts = Object.values(productsProp).filter(product => product.hasPayaGo);

    return Object.keys(products).some(productId => payaProducts.find(product => product.id === productId));
  }, [products, productsProp]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLDivElement>(null);

  useScrollListToActiveProduct({ scrollRef, activeRef });

  const handleProductDelete = useProductDelete();
  const handleProductClick = useProductClick();

  const deferredTotal = useDeferredValue(total);

  const handleCatalogOpen = () => {
    onCatalogOpen?.();
    setCatalogOpen(true);
  };

  return (
    <div
      className={cn(styles.priceSummary, className)}
      data-mobile={isMobile || undefined}
      data-test-id={parseKeyToDataTest('price', 'summary')}
    >
      <div className={styles.headline}>
        <TitleComponent data-test-id={parseKeyToDataTest('price', 'summary-title')}>Расчет</TitleComponent>
        <ButtonTonal
          onClick={handleCatalogOpen}
          size='m'
          icon={<PlusSVG />}
          label='Добавить сервис'
          fullWidth={isMobile}
          appearance='neutral'
          data-test-id={parseKeyToDataTest('price', 'summary-button')}
        />
      </div>

      <Scroll className={styles.scroll} ref={scrollRef} data-test-id={parseKeyToDataTest('price', 'summary-products')}>
        <div className={styles.content}>
          {Object.entries(productCards)
            .filter(([, products]) => products.length > 0)
            .map(([platformId, cards]) => (
              <div key={platformId} className={styles.platform}>
                <Typography.SansTitleM data-test-id={parseKeyToDataTest('price', 'summary-platform')}>
                  Платформа {platforms.find(item => item.id === platformId)?.label}{' '}
                  {isPartners && <Tag label={`${PlatformSale[platformId]}% скидка`} appearance='red' size='xs' />}
                </Typography.SansTitleM>

                <div className={styles.body}>
                  {cards.map(({ id, idx, label }) => (
                    <div
                      key={id + idx}
                      ref={selectedProduct?.id === id && selectedProduct?.idx === idx ? activeRef : undefined}
                    >
                      <ProductCard
                        id={id}
                        idx={idx}
                        label={label}
                        selectedProduct={selectedProduct}
                        onProductClick={handleProductClick}
                        onProductDelete={handleProductDelete}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </Scroll>

      <div className={styles.footer} data-test-id={parseKeyToDataTest('price', 'summary-footer')}>
        <div>
          <div className={styles.caption} data-test-id={parseKeyToDataTest('price', 'summary-title')}>
            Общая стоимость с&nbsp;НДС
          </div>
          <div className={styles.footerHeadline}>
            <div className={styles.total} data-test-id={parseKeyToDataTest('price', 'summary-footer-total')}>
              <Typography.SansHeadlineS>
                <TruncateString text={formatNumber(deferredTotal)} maxLines={1} />
              </Typography.SansHeadlineS>
              <Typography.SansTitleL>₽</Typography.SansTitleL>
            </div>

            <PricePeriodSelect hasPayaGo={hasPayaGo} />
          </div>
        </div>

        <ProductListActions />
      </div>
    </div>
  );
}
