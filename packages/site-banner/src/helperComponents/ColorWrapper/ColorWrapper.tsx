import cn from 'classnames';
import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from 'react';

import { ButtonPromoProps } from '@sbercloud/uikit-product-button-predefined';
import { EridProps } from '@sbercloud/uikit-product-site-tag';
import { WithSupportProps } from '@sbercloud/uikit-product-utils';

import { AppearanceType, WithColor, WithoutColor } from '../BannerCommon/types';
import styles from './styles.module.scss';

type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export type ColorWrapperProps = PropsWithChildren<
  WithSupportProps<
    {
      className?: string;
    } & (WithColor | WithoutColor)
  >
>;

export function ColorWrapper({ id, className, children, color, appearance, ...other }: ColorWrapperProps & DivProps) {
  return (
    <div id={id} data-appearance={appearance} data-color={color} className={cn(styles.root, className)} {...other}>
      {children}
    </div>
  );
}

ColorWrapper.getButtonAppearance = (appearance: AppearanceType): ButtonPromoProps['appearance'] =>
  appearance !== 'graphite' ? 'secondary' : 'tertiary';

ColorWrapper.getEridAppearance = (appearance: AppearanceType): EridProps['appearance'] =>
  appearance === 'graphite' ? 'invert-neutral' : 'neutral';
