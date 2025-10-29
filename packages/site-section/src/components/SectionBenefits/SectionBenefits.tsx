import { MouseEvent, useMemo, useState } from 'react';

import { CardBasic, CardInfo, CardProduct } from '@sbercloud/uikit-product-site-cards';
import { Grid, GridProps } from '@sbercloud/uikit-product-site-grid';
import { extractSupportProps, WithLayoutType, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { Typography } from '@snack-uikit/typography';

import { SectionButton, SectionTitleProps } from '../../helperComponents';
import { SectionButtonProps } from '../../helperComponents/SectionButton/types';
import { SectionColor } from '../../types';
import { SectionBasic } from '../SectionBasic';
import { CardNumeric } from './components';
import styles from './styles.module.scss';
import { ContentBasic, ContentInfo, ContentNumeric, ContentProduct } from './types';

export type SectionBenefitsProps = WithSupportProps<
  WithLayoutType<{
    /** id секции */
    id?: string;
    /** Название секции */
    title?: string;
    /** Название подзаголовка секции */
    subtitle?: string;
    /** Цвет фона секции */
    backgroundColor?: SectionColor;
    /** Тег заголовка */
    titleTag?: SectionTitleProps['titleTag'];
    /** Тег заголовка */
    subtitleTag?: SectionTitleProps['subtitleTag'];
    /** Описание секции */
    description?: string;
    /** Конфигурация настройки колонок для разных layoutType */
    columnsConfig: GridProps['columnsConfig'];
    /** Текст нижней сноски */
    note?: string;

    buttons?: SectionButtonProps[];
    /**
     * Выравнивание кнопок по горизонтали
     * @default 'left'
     */
    buttonsAlign?: 'left' | 'center';
  }>
> &
  (ContentBasic | ContentInfo | ContentNumeric | ContentProduct);

export function SectionBenefits({
  id,
  title,
  titleTag,
  subtitle,
  subtitleTag,
  description,
  type,
  content,
  tabBarItems,
  columnsConfig,
  layoutType,
  buttons,
  note,
  backgroundColor,
  buttonsAlign = 'left',
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

  const outline = (rest as ContentInfo).outline;
  const gap = type === 'basic' ? 'l' : 's';
  const backgroundColorSection = type === 'basic' || outline ? 'neutral-background1-level' : 'neutral-background';

  return (
    <SectionBasic
      id={id}
      title={title}
      titleTag={titleTag}
      subtitle={subtitle}
      subtitleTag={subtitleTag}
      description={description}
      layoutType={layoutType}
      backgroundColor={backgroundColor || backgroundColorSection}
      tabBarItems={tabs}
      {...extractSupportProps(rest)}
    >
      {!tabBarItems && (
        <Grid layoutType={layoutType} columnsConfig={columnsConfig} gap={gap}>
          {type === 'info' &&
            content.map((item, index) => <CardInfo key={index} {...item} outline={outline} layoutType={layoutType} />)}

          {type === 'numeric' &&
            content.map((item, index) => (
              <CardNumeric key={index} {...item} number={index + 1} layoutType={layoutType} />
            ))}

          {type === 'product' &&
            content.map((item, index) => <CardProduct key={index} {...item} layoutType={layoutType} />)}

          {type === 'basic' &&
            content.map((item, index) => <CardBasic key={index} {...item} layoutType={layoutType} />)}
        </Grid>
      )}

      {tabBarItems && (
        <Grid layoutType={layoutType} columnsConfig={columnsConfig} gap={gap}>
          {type === 'info' &&
            content
              .filter(({ tabValue }) => tabValue === activeTab)
              .map(({ cards }) =>
                cards.map((card, index) => (
                  <CardInfo key={index} layoutType={layoutType} {...card} outline={outline} />
                )),
              )}

          {type === 'numeric' &&
            content
              .filter(({ tabValue }) => tabValue === activeTab)
              .map(({ cards }) =>
                cards.map((card, index) => (
                  <CardNumeric key={index} layoutType={layoutType} {...card} number={index + 1} />
                )),
              )}

          {type === 'product' &&
            content
              .filter(({ tabValue }) => tabValue === activeTab)
              .map(({ cards }) =>
                cards.map((card, index) => <CardProduct key={index} layoutType={layoutType} {...card} />),
              )}

          {type === 'basic' &&
            content
              .filter(({ tabValue }) => tabValue === activeTab)
              .map(({ cards }) =>
                cards.map((card, index) => <CardBasic key={index} layoutType={layoutType} {...card} />),
              )}
        </Grid>
      )}

      {note && (
        <Typography.SansBodyM className={styles.note}>
          <span dangerouslySetInnerHTML={{ __html: note }} />
        </Typography.SansBodyM>
      )}

      {buttons && (
        <div className={styles.buttons} data-buttons-align={buttonsAlign}>
          {buttons.map(button => SectionButton(button))}
        </div>
      )}
    </SectionBasic>
  );
}
