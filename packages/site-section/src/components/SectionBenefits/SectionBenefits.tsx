import { MouseEvent, useMemo, useState } from 'react';

import { CardBasic, CardInfo } from '@sbercloud/uikit-product-site-cards';
import { Grid, GridProps } from '@sbercloud/uikit-product-site-grid';
import { extractSupportProps, WithLayoutType, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { ButtonFilled, ButtonFilledProps } from '@snack-uikit/button';
import { Link } from '@snack-uikit/link';

import { SectionTitleProps } from '../../helperComponents';
import { SectionBasic } from '../SectionBasic';
import { CardNumeric } from './components';
import styles from './styles.module.scss';
import { ContentBasic, ContentInfo, ContentNumeric } from './types';

export type SectionBenefitsProps = WithSupportProps<
  WithLayoutType<{
    /** id секции */
    id?: string;
    /** Название секции */
    title?: string;
    /** Тег заголовка */
    titleTag?: SectionTitleProps['titleTag'];
    /** Описание секции */
    description?: string;
    /** Конфигурация настройки колонок для разных layoutType */
    columnsConfig: GridProps['columnsConfig'];

    buttons?: {
      label: string;
      href?: string;
      target?: ButtonFilledProps['target'];
      onClick?: ButtonFilledProps['onClick'];
    }[];
  }>
> &
  (ContentBasic | ContentInfo | ContentNumeric);

export function SectionBenefits({
  id,
  title,
  titleTag,
  description,
  type,
  content,
  tabBarItems,
  columnsConfig,
  layoutType,
  buttons,
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
  const backgroundColor = type === 'basic' || outline ? 'neutral-background1-level' : 'neutral-background';

  return (
    <SectionBasic
      id={id}
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
          {type === 'info' &&
            content.map((item, index) => <CardInfo key={index} {...item} outline={outline} layoutType={layoutType} />)}

          {type === 'numeric' &&
            content.map((item, index) => (
              <CardNumeric key={index} {...item} number={index + 1} layoutType={layoutType} />
            ))}

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

          {type === 'basic' &&
            content
              .filter(({ tabValue }) => tabValue === activeTab)
              .map(({ cards }) =>
                cards.map((card, index) => <CardBasic key={index} layoutType={layoutType} {...card} />),
              )}
        </Grid>
      )}

      {buttons && (
        <div className={styles.buttons}>
          {buttons.map(button =>
            button.href ? (
              <Link key={button.label} {...button} text={button.label} size='l' insideText />
            ) : (
              <ButtonFilled size='l' key={button.label} {...button} />
            ),
          )}
        </div>
      )}
    </SectionBasic>
  );
}
