import { useDeferredValue } from 'react';

import { KebabSVG } from '@cloud-ru/uikit-product-icons';
import { AdaptiveDroplist } from '@cloud-ru/uikit-product-mobile-dropdown';
import { ButtonFunction } from '@snack-uikit/button';
import { Card } from '@snack-uikit/card';

import { useCalculatorContext } from '../../../../contexts';
import { formatNumber, getPrice, getValue, parseKeyToDataTest } from '../../../../utils';
import { PRICE_NAME } from '../PricePeriodSelect';
import styles from './styles.module.scss';

type ProductCardProps = {
  id: string;
  idx: number;
  label: string;

  selectedProduct: { id: string; idx: number } | null;

  onProductClick(id: string, idx: number): void;
  onProductDelete(productId: string, idx: number): void;
};

export function ProductCard({ id, idx, label, selectedProduct, onProductClick, onProductDelete }: ProductCardProps) {
  const { layoutType, pricePeriod, calculatorType, products } = useCalculatorContext();
  const isPartners = calculatorType === 'partners';
  const isChecked = selectedProduct?.id === id && selectedProduct?.idx === idx;
  const dataTestAttribute = parseKeyToDataTest('price', 'summary-product-card');

  const price = useDeferredValue(getValue(products, `[${id}][${idx}].price`));

  return (
    <>
      <Card
        size='s'
        onClick={() => {
          onProductClick(id, idx);
        }}
        checked={isChecked}
        outline
        key={id + '_' + idx}
        data-test-id={dataTestAttribute}
      >
        <div className={styles.wrapper}>
          <Card.Header
            truncate={{
              title: 10,
              description: 20,
            }}
            title={label}
            description={`${formatNumber(getPrice({ price, pricePeriod, partners: isPartners }))} ₽ ${PRICE_NAME[pricePeriod]}`}
          />
          <div
            role='button'
            tabIndex={0}
            onClick={e => {
              e.stopPropagation();
            }}
          >
            <AdaptiveDroplist
              layoutType={layoutType}
              placement='bottom-end'
              size='m'
              closeDroplistOnItemClick
              items={[
                {
                  id: 'remove',
                  content: {
                    option: 'Удалить',
                  },
                  onClick: () => {
                    onProductDelete(id, idx);
                  },
                },
              ]}
            >
              <ButtonFunction icon={<KebabSVG />} size='m' />
            </AdaptiveDroplist>
          </div>
        </div>
      </Card>
    </>
  );
}
