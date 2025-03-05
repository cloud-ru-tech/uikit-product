import cn from 'classnames';

import {
  ButtonPromo,
  ButtonPromoOutline,
  ButtonPromoOutlineProps,
  ButtonPromoProps,
} from '@sbercloud/uikit-product-button-predefined';
import { TagPredefined, TagPredefinedProps } from '@sbercloud/uikit-product-site-tag';
import { extractSupportProps, WithLayoutType, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { PromoTag } from '@snack-uikit/promo-tag';
import { Typography } from '@snack-uikit/typography';

import { Erid, EridProps } from '../../helperComponents';
import styles from './styles.module.scss';
import { WithColor, WithoutColor } from './types';
import { getBlockTitleProps } from './util';

export type BannerPrimaryProps = WithSupportProps<
  WithLayoutType<
    {
      /** id компонента */
      id?: string;
      /** Заголовок*/
      title: string;
      /** Описание*/
      description?: string;
      /** Ссылка на картинку */
      img: string;
      /** Форма картинки */
      imgType: 'rectangle' | 'square';
      /** Тэги */
      tags?: {
        expirationDate?: string;

        predefinedTags: Pick<TagPredefinedProps, 'variant' | 'type'>[];
      };
      /** Массив с настройками кнопок ButtonFilled */
      buttons: [Omit<ButtonPromoProps, 'size' | 'appearance'>, Omit<ButtonPromoOutlineProps, 'size' | 'appearance'>?];
      /** CSS-класс */
      className?: string;
      /** Плашка рекламы с tooltip */
      erid?: Pick<EridProps, 'tip' | 'appearance'>;
    } & (WithColor | WithoutColor)
  >
>;

export function BannerPrimary({
  id,
  title,
  description,
  img,
  imgType,
  tags,
  erid,
  buttons,
  appearance,
  layoutType,
  color,
  className,
  ...rest
}: BannerPrimaryProps) {
  const buttonAppearance = appearance !== 'graphite' ? 'secondary' : 'tertiary';

  return (
    <div
      id={id}
      className={cn(styles.root, className)}
      data-image-type={imgType}
      data-layout-type={layoutType}
      data-appearance={appearance}
      data-color={color}
      {...extractSupportProps(rest)}
    >
      {erid && <Erid className={styles.erid} tip={erid.tip} appearance={erid.appearance} />}
      <div className={styles.content}>
        {tags && (
          <div className={styles.tags}>
            {tags.expirationDate && (
              <PromoTag size='xs' text={`Действует до ${tags.expirationDate}`} appearance='neutral' color='decor' />
            )}

            {tags.predefinedTags?.map((tag, index) => (
              // eslint-disable-next-line
              // @ts-ignore
              <TagPredefined key={index} {...tag} size='xs' />
            ))}
          </div>
        )}

        <div className={styles.text}>
          <Typography className={styles.title} family='sans' {...getBlockTitleProps(layoutType)}>
            {title}
          </Typography>
          <Typography.SansBodyL className={styles.description}>{description}</Typography.SansBodyL>
        </div>

        {buttons && buttons.length > 0 && (
          <div className={styles.buttons}>
            <ButtonPromo
              className={styles.button}
              target='_self'
              {...buttons[0]}
              size='l'
              appearance={buttonAppearance}
            />

            {buttons?.length > 1 && (
              <ButtonPromoOutline
                className={styles.button}
                target='_self'
                {...buttons[1]}
                size='l'
                appearance={buttonAppearance}
              />
            )}
          </div>
        )}
      </div>
      <div className={styles.imgWrapper}>
        <img className={styles.img} src={img} alt='banner-image' />
      </div>
    </div>
  );
}
