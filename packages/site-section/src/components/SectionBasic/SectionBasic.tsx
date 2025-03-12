import cn from 'classnames';
import { MouseEvent, ReactNode, useState } from 'react';

import { useLocale } from '@sbercloud/uikit-product-locale';
import { AdaptiveFieldSelect, FieldSelectProps } from '@sbercloud/uikit-product-mobile-fields';
import { Layout } from '@sbercloud/uikit-product-site-layout';
import { extractSupportProps, WithLayoutType, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { ButtonOutline } from '@snack-uikit/button';
import { Pagination, PaginationProps } from '@snack-uikit/pagination';
import { Tabs } from '@snack-uikit/tabs';

import { SECTION_COLORS } from '../../constants';
import { SectionTitle, SectionTitleProps } from '../../helperComponents';
import { SectionColor } from '../../types';
import styles from './styles.module.scss';

type TabBarItem = WithSupportProps<{
  value: string;
  label: string;
  disabled?: boolean;
  className?: string;
  counter?: number;
  onClick?(event: MouseEvent<HTMLButtonElement>): void;
}>;

export type SectionBasicProps = WithLayoutType<
  WithSupportProps<
    Pick<SectionTitleProps, 'title' | 'description' | 'titleSectionSize' | 'titleTag'> & {
      /** id секции */
      id?: string;
      children: ReactNode;
      /** Массив табов */
      tabBarItems?: TabBarItem[];
      /** Массив фильтров */
      filterItems?: FieldSelectProps[];
      /** Настройки пагинации */
      pagination?: PaginationProps;
      /** Цвет фона */
      backgroundColor?: SectionColor;
      /** CSS-класс */
      className?: string;
      /** Колбек на клик по кнопке "Показать ещё" */
      onLoadMoreClick?(): void;
    }
  >
>;

const getInitialTab = (tabBarItems?: TabBarItem[]) => {
  if (!tabBarItems || tabBarItems.length < 1) {
    return undefined;
  }

  const [firstTab] = tabBarItems;
  return firstTab.value;
};

export function SectionBasic({
  id,
  children,
  title,
  description,
  titleSectionSize = 'm',
  titleTag,
  tabBarItems,
  filterItems,
  onLoadMoreClick,
  className,
  pagination,
  backgroundColor = SECTION_COLORS.NeutralBackground1Level,
  layoutType,
  ...rest
}: SectionBasicProps) {
  const [currentTab, setCurrentTab] = useState<string | undefined>(getInitialTab(tabBarItems));
  const { t } = useLocale('SiteSection');
  const showFooter = Boolean(pagination || onLoadMoreClick);

  return (
    <Layout.SectionWrapper
      id={id}
      layoutType={layoutType}
      className={cn(className, styles.wrapper)}
      data-section-background={backgroundColor}
      {...extractSupportProps(rest)}
    >
      <div className={styles.sectionBasic} data-layout-type={layoutType}>
        <SectionTitle
          layoutType={layoutType}
          title={title}
          description={description}
          titleSectionSize={titleSectionSize}
          titleTag={titleTag}
        />

        {tabBarItems?.length && (
          <div className={styles.sectionTabs}>
            <Tabs value={currentTab} onChange={setCurrentTab}>
              <Tabs.TabBar>
                {tabBarItems.map(tabProps => (
                  <Tabs.Tab key={tabProps.value} {...tabProps} />
                ))}
              </Tabs.TabBar>
            </Tabs>
          </div>
        )}

        {filterItems?.length && (
          <div className={styles.sectionFilters} data-layout-type={layoutType}>
            {filterItems.map(filterProps => (
              <AdaptiveFieldSelect
                key={filterProps.id}
                {...filterProps}
                className={cn(filterProps.className, styles.filter)}
                layoutType={layoutType}
                size='l'
              />
            ))}
          </div>
        )}

        {children}

        {showFooter && (
          <div className={styles.footer} data-layout-type={layoutType}>
            {pagination && <Pagination {...pagination} />}
            {onLoadMoreClick && (
              <ButtonOutline
                className={styles.showMoreButton}
                label={t('Basic.showMore')}
                onClick={onLoadMoreClick}
                appearance='neutral'
                size='l'
                type='button'
                data-layout-type={layoutType}
              />
            )}
          </div>
        )}
      </div>
    </Layout.SectionWrapper>
  );
}
