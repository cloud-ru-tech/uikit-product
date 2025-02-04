import cn from 'classnames';
import { useMemo } from 'react';

import { Layout } from '@sbercloud/uikit-product-site-layout';
import { extractSupportProps, WithLayoutType, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { Breadcrumbs, Item } from '@snack-uikit/breadcrumbs';
import { ButtonFilled, ButtonFilledProps } from '@snack-uikit/button';
import { Typography } from '@snack-uikit/typography';

import { HERO_COLORS } from '../../constants';
import { getHeroZeroTypographyProps } from '../../helpers';
import { HeroColor } from '../../types';
import styles from './styles.module.scss';

export type HeroZeroProps = WithSupportProps<
  WithLayoutType<{
    /** Хлебные крошки */
    breadcrumbs: Item[];
    /** Название секции */
    title: string;
    /** Описание секции */
    description?: string;
    /** Массив с настройками кнопок ButtonFilled */
    buttons?: [ButtonFilledProps, ButtonFilledProps?];
    /** Наличие нижнего паддинга */
    showBottomPadding?: boolean;
    /** Цвет фона */
    backgroundColor?: HeroColor;
    /** CSS - класснейм */
    className?: string;
  }>
>;

export function HeroZero({
  breadcrumbs,
  title,
  description,
  layoutType,
  buttons,
  className,
  backgroundColor = HERO_COLORS.NeutralBackground,
  showBottomPadding = true,
  ...rest
}: HeroZeroProps) {
  const titleTypographyProps = useMemo(() => getHeroZeroTypographyProps(layoutType), [layoutType]);

  return (
    <Layout.SectionWrapper
      layoutType={layoutType}
      className={cn(className, styles.sectionWrapper)}
      data-section-background={backgroundColor}
      {...extractSupportProps(rest)}
    >
      <div className={cn(styles.heroZero, { [styles.withBottomPadding]: showBottomPadding })}>
        <div className={styles.contentLayout} data-layout-type={layoutType}>
          <div className={styles.contentText} data-layout-type={layoutType}>
            <Breadcrumbs items={breadcrumbs} size='xs' />

            <div className={styles.text} data-layout-type={layoutType}>
              <Typography family='sans' tag='h1' className={styles.title} {...titleTypographyProps}>
                {title}
              </Typography>

              {description && (
                <Typography.SansBodyL tag='p' className={styles.description}>
                  {description}
                </Typography.SansBodyL>
              )}
            </div>
          </div>

          {buttons && buttons.length > 0 && (
            <div className={styles.buttons} data-layout-type={layoutType}>
              {buttons.map((props, index) => (
                <ButtonFilled key={index} className={styles.button} {...props} data-layout-type={layoutType} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout.SectionWrapper>
  );
}
