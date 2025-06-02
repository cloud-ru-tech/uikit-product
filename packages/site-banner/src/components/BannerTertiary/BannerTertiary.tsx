import cn from 'classnames';

import { ButtonPromo, ButtonPromoProps } from '@sbercloud/uikit-product-button-predefined';
import { RichText } from '@sbercloud/uikit-product-site-rich-text';
import { Erid, EridProps } from '@sbercloud/uikit-product-site-tag';
import { LAYOUT_TYPE, LayoutType, WithLayoutType, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { Typography, TypographyProps } from '@snack-uikit/typography';

import { ColorWrapper, ColorWrapperProps } from '../../helperComponents/ColorWrapper';
import styles from './styles.module.scss';

export type BannerTertiaryProps = WithSupportProps<
  WithLayoutType<{
    /** id компонента */
    id?: string;
    /** Заголовок */
    title: string;
    /** Описание */
    description?: string;
    /** Кнопка */
    button?: Omit<ButtonPromoProps, 'size' | 'appearance'>;
    /** Ссылка на картинку */
    img: string;
    /** Плашка рекламы с tooltip */
    erid?: Pick<EridProps, 'tip'>;
    /** css-класс */
    className?: string;
  }> &
    ColorWrapperProps
>;

const MAP_LAYOUT_TO_TEXT_SIZE: Record<LayoutType, TypographyProps['size']> = {
  [LAYOUT_TYPE.Desktop]: 'l',
  [LAYOUT_TYPE.DesktopSmall]: 'l',
  [LAYOUT_TYPE.Tablet]: 'l',
  [LAYOUT_TYPE.Mobile]: 'm',
};

export function BannerTertiary({
  layoutType,
  title,
  description,
  img,
  button,
  erid,
  className,
  ...rest
}: BannerTertiaryProps) {
  const isMobile = layoutType === 'mobile';

  return (
    <ColorWrapper {...rest} className={cn(className, styles.root)} data-layout-type={layoutType}>
      {erid && (
        <Erid className={styles.erid} tip={erid.tip} appearance={ColorWrapper.getEridAppearance(rest.appearance)} />
      )}

      <div className={styles.content}>
        <img className={styles.image} src={img} alt={title} />

        <div data-color-wrapper-role='text' className={styles.texts}>
          <Typography size={MAP_LAYOUT_TO_TEXT_SIZE[layoutType]} className={styles.title} purpose='title' family='sans'>
            <RichText richText={title} />
          </Typography>

          <Typography
            size={MAP_LAYOUT_TO_TEXT_SIZE[layoutType]}
            className={styles.description}
            purpose='body'
            family='sans'
          >
            <RichText richText={description} />
          </Typography>
        </div>

        <ButtonPromo
          target='_self'
          {...button}
          size='l'
          appearance={ColorWrapper.getButtonAppearance(rest.appearance)}
          fullWidth={isMobile}
        />
      </div>
    </ColorWrapper>
  );
}
