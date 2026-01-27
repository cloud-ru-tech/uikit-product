import cn from 'classnames';
import { useUncontrolledProp } from 'uncontrollable';

import { CardProduct, CardProductProps } from '@cloud-ru/uikit-product-site-cards';
import { Grid } from '@cloud-ru/uikit-product-site-grid';
import { extractSupportProps, WithLayoutType, WithSupportProps } from '@cloud-ru/uikit-product-utils';
import { Tabs } from '@snack-uikit/tabs';

import { SectionCatalogFooter, SectionCatalogFooterProps } from '../../helperComponents';
import { SectionColor } from '../../types';
import { SectionBasic } from '../SectionBasic';
import { GRID_CONFIG } from './constants';
import styles from './styles.module.scss';

type ProductCategory = {
  id: string;
  label: string;
  items: Omit<CardProductProps, 'layoutType'>[];
};

export type SectionCatalogProps = WithSupportProps<
  WithLayoutType<{
    /** id секции */
    id?: string;
    /** CSS-класс */
    className?: string;
    /** Заголовок */
    title: string;
    /** Цвет фона */
    backgroundColor?: SectionColor;
    /** Список продуктов по категориям */
    categories: ProductCategory[];
    /** Выбранная категория продуктов */
    selectedCategory?: string;
    /** Колбек смены выбранной категории продуктов */
    onCategorySelect?(category: string): void;
    /** Список элементов для футера в каталоге */
    footer?: SectionCatalogFooterProps['items'];
  }>
>;

export function SectionCatalog({
  id,
  layoutType,
  className,
  title,
  backgroundColor,
  selectedCategory: selectedCategoryProp,
  onCategorySelect,
  categories,
  footer,
  ...rest
}: SectionCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useUncontrolledProp(
    selectedCategoryProp,
    categories[0].id,
    onCategorySelect,
  );

  const isDesktop = ['desktop', 'desktopSmall'].includes(layoutType);

  const isOutlineCard = backgroundColor === 'neutral-background1-level';

  return (
    <SectionBasic
      id={id}
      title={title}
      backgroundColor={backgroundColor}
      layoutType={layoutType}
      className={cn(className, styles.sectionCatalog)}
      {...extractSupportProps(rest)}
    >
      <div className={styles.body}>
        <Tabs value={selectedCategory} onChange={setSelectedCategory}>
          <div className={cn(styles.categoryList, { [styles.desktopCategoryList]: isDesktop })}>
            <Tabs.TabBar
              type='primary'
              orientation={isDesktop ? 'vertical' : 'horizontal'}
              markerPosition={isDesktop ? 'before' : 'after'}
              className={cn({ [styles.desktopTabs]: isDesktop })}
            >
              {categories.map(({ id, label }) => (
                <Tabs.Tab key={id} value={id} label={label} />
              ))}
            </Tabs.TabBar>

            {footer && isDesktop && <SectionCatalogFooter items={footer} layoutType={layoutType} />}
          </div>

          {categories.map(({ id, items }) => (
            <Tabs.TabContent key={id} value={id} className={styles.tabContent}>
              <Grid columnsConfig={GRID_CONFIG} gap='xs' layoutType={layoutType}>
                {items.map(item => (
                  <CardProduct key={item.title} layoutType={layoutType} outline={isOutlineCard} {...item} />
                ))}
              </Grid>
            </Tabs.TabContent>
          ))}
        </Tabs>

        {footer && !isDesktop && <SectionCatalogFooter items={footer} layoutType={layoutType} />}
      </div>
    </SectionBasic>
  );
}
