import cn from 'classnames';

import { Layout } from '@cloud-ru/uikit-product-site-layout';
import { RichText } from '@cloud-ru/uikit-product-site-rich-text';
import { extractSupportProps, WithLayoutType, WithSupportProps } from '@cloud-ru/uikit-product-utils';
import { Breadcrumbs, Item } from '@snack-uikit/breadcrumbs';
import { ButtonFilled, ButtonFilledProps } from '@snack-uikit/button';
import { Typography } from '@snack-uikit/typography';

import { HERO_COLORS } from '../../constants';
import { HeroColor } from '../../types';
import styles from './styles.module.scss';
import { getTitleTypographyProps } from './utils';

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
    /** Выравнивание текста */
    contentAlign?: 'left' | 'center';
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
  contentAlign = 'left',
  ...rest
}: HeroZeroProps) {
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

            <div className={styles.text} data-layout-type={layoutType} data-align={contentAlign}>
              <Typography family='sans' tag='h1' className={styles.title} {...getTitleTypographyProps(layoutType)}>
                {title}
              </Typography>

              {description && (
                <Typography.SansBodyL tag='div' className={styles.description}>
                  <RichText richText={description} />
                </Typography.SansBodyL>
              )}
            </div>
          </div>

          {buttons && buttons.length > 0 && (
            <div className={styles.buttons} data-layout-type={layoutType} data-align={contentAlign}>
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
