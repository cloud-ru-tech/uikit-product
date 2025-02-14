import { MouseEvent, useMemo, useState } from 'react';

import { CardBasic, CardInfo } from '@sbercloud/uikit-product-site-cards';
import { Grid, GridProps } from '@sbercloud/uikit-product-site-grid';
import { extractSupportProps, WithLayoutType, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { SectionTitleProps } from '../../helperComponents';
import { SectionBasic } from '../SectionBasic';
import { ContentBasic, ContentInfo } from './types';

export type SectionBenefitsProps = WithSupportProps<
  WithLayoutType<{
    /** Название секции */
    title?: string;
    /** Тег заголовка */
    titleTag?: SectionTitleProps['titleTag'];
    /** Описание секции */
    description?: string;
    /** Конфигурация настройки колонок для разных layoutType */
    columnsConfig: GridProps['columnsConfig'];
  }>
> &
  (ContentBasic | ContentInfo);

export function SectionBenefits({
  title,
  titleTag,
  description,
  type,
  content,
  tabBarItems,
  columnsConfig,
  layoutType,
  ...rest
}: SectionBenefitsProps) {
  const [activeTab, setActiveTab] = useState(tabBarItems && tabBarItems[0].value);

  const tabs = useMemo(
    () =>
      tabBarItems?.map(tab => ({
        ...tab,
        onClick: (e: MouseEvent<HTMLButtonElement>) => {
          setActiveTab(tab.value);
          tab.onClick?.(e);
        },
      })),
    [tabBarItems],
  );

  const gap = type === 'basic' ? 'l' : 's';
  const backgroundColor = type === 'basic' ? 'neutral-background1-level' : 'neutral-background';

  return (
    <SectionBasic
      title={title}
      titleTag={titleTag}
      description={description}
      layoutType={layoutType}
      backgroundColor={backgroundColor}
      tabBarItems={tabs}
      {...extractSupportProps(rest)}
    >
      {!tabBarItems && (
        <Grid layoutType={layoutType} columnsConfig={columnsConfig} gap={gap}>
          {type === 'info' && content.map((item, index) => <CardInfo key={index} {...item} layoutType={layoutType} />)}

          {type === 'basic' &&
            content.map((item, index) => <CardBasic key={index} {...item} layoutType={layoutType} />)}
        </Grid>
      )}

      {tabBarItems && (
        <Grid layoutType={layoutType} columnsConfig={columnsConfig} gap={gap}>
          {type === 'info' &&
            content
              .filter(({ tabValue }) => tabValue === activeTab)
              .map(({ cardInfoItems }) =>
                cardInfoItems.map((card, key) => <CardInfo key={key} layoutType={layoutType} {...card} />),
              )}

          {type === 'basic' &&
            content
              .filter(({ tabValue }) => tabValue === activeTab)
              .map(({ cardBasicItems }) =>
                cardBasicItems.map((card, key) => <CardBasic key={key} layoutType={layoutType} {...card} />),
              )}
        </Grid>
      )}
    </SectionBasic>
  );
}
