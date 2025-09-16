import cn from 'classnames';
import { useState } from 'react';

import { FilterSVG } from '@sbercloud/uikit-product-icons';
import { MobileDroplist } from '@sbercloud/uikit-product-mobile-dropdown';
import { AdaptiveFieldSelect } from '@sbercloud/uikit-product-mobile-fields';
import { MobileModalCustom } from '@sbercloud/uikit-product-mobile-modal';
import { LAYOUT_TYPE, LayoutType } from '@sbercloud/uikit-product-utils';
import { ButtonFilled } from '@snack-uikit/button';
import { Card } from '@snack-uikit/card';
import { Divider } from '@snack-uikit/divider';
import { List } from '@snack-uikit/list';
import { ModalCustom } from '@snack-uikit/modal';
import { Tag } from '@snack-uikit/tag';
import { Tooltip } from '@snack-uikit/tooltip';

import { useCalculatorContext } from '../../contexts';
import { useCatalogCardClick } from '../../hooks';
import { CatalogConfig, PlatformType } from '../../types';
import { parseKeyToDataTest } from '../../utils';
import { PrivateCardHeader } from './components';
import styles from './styles.module.scss';

const bannerText = {
  public: 'Доступна всем',
  request: 'Для всех, по заявке',
  legal: 'Только для юрлиц',
};

export type CatalogProps = {
  layoutType?: LayoutType;
  config: CatalogConfig;
  open: boolean;
  setOpen(open: boolean): void;
  onCardClick?(productId: string): void;
};

export function Catalog() {
  const {
    selectedPlatform,
    setSelectedPlatform,
    setSelectedCategory,
    selectedCategory,

    products,
    layoutType = LAYOUT_TYPE.Desktop,
    config,
    catalogOpen,
    setCatalogOpen,

    actions: { onPlatformSelect },
  } = useCalculatorContext();

  const handleCatalogCardClick = useCatalogCardClick();

  const handlePlatformChange = (platformId: PlatformType) => {
    onPlatformSelect?.(platformId);
    setSelectedPlatform(platformId);
    setSelectedCategory(config.catalog[platformId][0].id);
  };

  const categoryOptions = config.catalog[selectedPlatform].map(({ id, dataTestId, label }) => ({
    id,
    content: {
      option: label,
    },
    'data-test-id': dataTestId,
  }));

  const [openMobileCategory, setOpenMobileCategory] = useState<boolean>(false);

  const isMobile = layoutType !== LAYOUT_TYPE.Desktop && layoutType !== LAYOUT_TYPE.DesktopSmall;
  const AdaptiveModal = isMobile ? MobileModalCustom : ModalCustom;

  return (
    <AdaptiveModal
      open={catalogOpen}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      size='l'
      onClose={() => {
        setCatalogOpen?.(false);
      }}
      className={cn({ [styles.modal]: !isMobile })}
      data-test-id={parseKeyToDataTest('catalog')}
    >
      <AdaptiveModal.Header title='Каталог продуктов' />
      <AdaptiveModal.Body
        content={
          <div className={styles.wrapper} data-mobile={isMobile || undefined}>
            <div className={styles.sidebar}>
              <AdaptiveFieldSelect
                layoutType={layoutType}
                value={selectedPlatform}
                onChange={handlePlatformChange}
                size='m'
                label='Облачная платформа'
                widthStrategy='eq'
                searchable={false}
                showClearButton={false}
                options={config.platforms.map(({ icon, description, id, label, dataTestId, access }) => ({
                  value: id,
                  beforeContent: icon,
                  truncate: {
                    option: 2,
                    description: 3,
                    variant: 'end',
                  },
                  'data-test-id': dataTestId,
                  option: label,
                  description: (
                    <div className={styles.description}>
                      <span>{description} </span>
                      <div>
                        <Tag label={bannerText[access]} appearance='green' />
                      </div>
                    </div>
                  ) as unknown as string,
                }))}
              />
              {!isMobile && (
                <div className={styles.categoriesWrapper}>
                  <Divider orientation='vertical' />
                  <List
                    size='m'
                    items={categoryOptions}
                    selection={{
                      value: selectedCategory,
                      onChange: value => value && setSelectedCategory(value),
                      mode: 'single',
                    }}
                  />
                </div>
              )}
            </div>

            <div className={styles.content}>
              <div className={styles.contentHeadline} data-test-id={parseKeyToDataTest('catalog', 'category-title')}>
                {config.catalog[selectedPlatform].find(item => item.id === selectedCategory)?.label}
              </div>

              <div className={styles.contentCards}>
                {config.catalog[selectedPlatform].find(item => item.id === selectedCategory)?.banner || null}

                {config.catalog[selectedPlatform]
                  .find(item => item.id === selectedCategory)
                  ?.visibleProducts.map(productId => config.products[productId])
                  .filter(Boolean)
                  .map(product => {
                    const disabled = product.freeTier && Object.keys(products).includes(product.id);
                    return (
                      <Card
                        key={product.id}
                        className={styles.card}
                        size={isMobile ? 's' : 'm'}
                        outline
                        disabled={disabled}
                        onClick={disabled ? undefined : () => handleCatalogCardClick?.(product.id)}
                        promoBadge={disabled ? { text: 'Добавлен', appearance: 'green' } : undefined}
                        header={
                          <Tooltip
                            open={disabled ? undefined : false}
                            tip={
                              'Free tier продукты можно добавить только один раз. Чтобы посмотреть конфигурацию продукта, кликните на его карточку в расчете'
                            }
                          >
                            <PrivateCardHeader
                              icon={product?.icon}
                              title={product?.label}
                              metadata={product?.caption}
                              description={
                                product?.freeTier ? (
                                  <div className={styles.tag} data-test-id={parseKeyToDataTest('catalog', 'card-tag')}>
                                    <Tag label='Бесплатная конфигурация' appearance='green' />
                                  </div>
                                ) : null
                              }
                            />
                          </Tooltip>
                        }
                        data-test-id={parseKeyToDataTest('catalog', 'card')}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        }
      />

      {isMobile && (
        <AdaptiveModal.Footer
          actions={
            <MobileDroplist
              open={openMobileCategory}
              onOpenChange={setOpenMobileCategory}
              items={categoryOptions}
              selection={{
                value: selectedCategory,
                onChange: value => {
                  setSelectedCategory(value);
                  setOpenMobileCategory(false);
                },
                mode: 'single',
              }}
              label='Категории'
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              size='l'
            >
              <div className={styles.categoriesWrapper}>
                <ButtonFilled
                  size='m'
                  appearance='neutral'
                  icon={<FilterSVG />}
                  label={`Категории: ${config.catalog[selectedPlatform].find(item => item.id === selectedCategory)?.label}`}
                />
              </div>
            </MobileDroplist>
          }
        />
      )}
    </AdaptiveModal>
  );
}
