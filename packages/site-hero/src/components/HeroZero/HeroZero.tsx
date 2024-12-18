import cn from 'classnames';
import { useMemo } from 'react';

import { extractSupportProps, WithLayoutType, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { Breadcrumbs, Item } from '@snack-uikit/breadcrumbs';
import { ButtonFilled, ButtonFilledProps } from '@snack-uikit/button';
import { Typography } from '@snack-uikit/typography';

import { getHeroZeroTypographyProps } from '../../helpers';
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
    buttons?: ButtonFilledProps[];
    /** Наличие нижнего паддинга */
    showBottomPadding?: boolean;
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
  showBottomPadding = true,
  ...rest
}: HeroZeroProps) {
  const titleTypographyProps = useMemo(() => getHeroZeroTypographyProps(layoutType), [layoutType]);

  return (
    <section
      className={cn(styles.heroZero, { [styles.withBottomPadding]: showBottomPadding }, className)}
      data-layout-type={layoutType}
      {...extractSupportProps(rest)}
    >
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
    </section>
  );
}
