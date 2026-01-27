import cn from 'classnames';
import { ReactNode } from 'react';

import {
  ButtonPromo,
  ButtonPromoOutline,
  ButtonPromoOutlineProps,
  ButtonPromoProps,
} from '@cloud-ru/uikit-product-button-predefined';
import { RichText } from '@cloud-ru/uikit-product-site-rich-text';
import { Erid, EridProps } from '@cloud-ru/uikit-product-site-tag';
import { WithLayoutType, WithSupportProps } from '@cloud-ru/uikit-product-utils';
import { Typography } from '@snack-uikit/typography';

import { ColorWrapper, ColorWrapperProps } from '../ColorWrapper';
import styles from './styles.module.scss';
import { getBlockTitleProps } from './util';

export type BannerCommonProps = WithSupportProps<
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
      /** Массив с настройками кнопок ButtonFilled */
      buttons?: [Omit<ButtonPromoProps, 'size' | 'appearance'>, Omit<ButtonPromoOutlineProps, 'size' | 'appearance'>?];
      /** CSS-класс */
      className?: string;
      /** Плашка рекламы с tooltip */
      erid?: Pick<EridProps, 'tip' | 'appearance'>;
      /** Слот под контент */
      topSlot?: ReactNode;
      /** Размеры */
      sizes: {
        /** Размеры картинки */
        image: [number, number];
        /** Отступ между текстом и кнопками */
        mainGap: number;
      };
    } & ColorWrapperProps
  >
>;

export function BannerCommon({
  id,
  title,
  description,
  img,
  erid,
  buttons,
  layoutType,
  className,
  topSlot,
  sizes: {
    image: [maxImageWith, maxImageHeight],
    mainGap,
  },
  ...rest
}: BannerCommonProps) {
  return (
    <ColorWrapper
      id={id}
      className={cn(styles.root, className)}
      data-layout-type={layoutType}
      style={{
        '--site-banner-main-gap': `${mainGap}px`,
        '--site-banner-image-max-width': `${maxImageWith}px`,
        '--site-banner-image-max-height': `${maxImageHeight}px`,
      }}
      {...rest}
    >
      {erid && <Erid className={styles.erid} tip={erid.tip} appearance={erid.appearance} />}
      <div className={styles.content}>
        {topSlot}

        <div data-color-wrapper-role='text' className={styles.text}>
          <Typography className={styles.title} family='sans' {...getBlockTitleProps(layoutType)}>
            <RichText richText={title} />
          </Typography>
          <Typography.SansBodyL className={styles.description}>
            <RichText richText={description} />
          </Typography.SansBodyL>
        </div>

        {buttons && buttons.length > 0 && (
          <div className={styles.buttons}>
            <ButtonPromo
              className={styles.button}
              target='_self'
              {...buttons[0]}
              size='l'
              appearance={ColorWrapper.getButtonAppearance(rest.appearance)}
            />

            {buttons?.length > 1 && (
              <ButtonPromoOutline
                className={styles.button}
                target='_self'
                {...buttons[1]}
                size='l'
                appearance={ColorWrapper.getButtonAppearance(rest.appearance)}
              />
            )}
          </div>
        )}
      </div>
      <div className={styles.imgWrapper}>
        <img className={styles.img} src={img} alt={title} />
      </div>
    </ColorWrapper>
  );
}
