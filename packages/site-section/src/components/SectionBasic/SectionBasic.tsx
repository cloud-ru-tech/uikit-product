import cn from 'classnames';
import { MouseEvent, MouseEventHandler, ReactNode, useState } from 'react';

import { useLocale } from '@cloud-ru/uikit-product-locale';
import { AdaptiveFieldSelect, FieldSelectProps } from '@cloud-ru/uikit-product-mobile-fields';
import { Layout } from '@cloud-ru/uikit-product-site-layout';
import { extractSupportProps, WithLayoutType, WithSupportProps } from '@cloud-ru/uikit-product-utils';
import { ButtonOutline } from '@snack-uikit/button';
import { Pagination, PaginationProps } from '@snack-uikit/pagination';
import { Tabs } from '@snack-uikit/tabs';

import { SECTION_COLORS } from '../../constants';
import { SectionTitle, SectionTitleProps } from '../../helperComponents';
import { SectionColor } from '../../types';
import styles from './styles.module.scss';
import { getAppearanceByBackground } from './utils';

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
    Pick<
      SectionTitleProps,
      'title' | 'subtitle' | 'description' | 'titleSectionSize' | 'titleTag' | 'subtitleTag' | 'titleAlign'
    > & {
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
      /** Кнопка внизу секции */
      moreButton?: {
        label?: string;
        href?: string;
        onClick: MouseEventHandler<HTMLElement>;
        'data-test-id'?: string;
      };
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
  subtitle,
  description,
  titleSectionSize = 'm',
  titleTag,
  subtitleTag,
  tabBarItems,
  filterItems,
  moreButton,
  className,
  pagination,
  backgroundColor = SECTION_COLORS.NeutralBackground1Level,
  layoutType,
  titleAlign,
  ...rest
}: SectionBasicProps) {
  const [currentTab, setCurrentTab] = useState<string | undefined>(getInitialTab(tabBarItems));
  const { t } = useLocale('SiteSection');
  const showFooter = Boolean(pagination || moreButton);

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
          titleAlign={titleAlign}
          subtitle={subtitle}
          subtitleTag={subtitleTag}
          appearance={getAppearanceByBackground(backgroundColor)}
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
            {moreButton && (
              <ButtonOutline
                className={styles.showMoreButton}
                label={moreButton.label ?? t('Basic.showMore')}
                onClick={moreButton.onClick}
                href={moreButton.href}
                data-test-id={moreButton['data-test-id'] ?? 'section__more-btn'}
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
