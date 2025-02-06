import { MouseEventHandler } from 'react';

import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import { ButtonFilled, ButtonFilledProps } from '@snack-uikit/button';

import { HERO_BUTTON_META } from './constants';
import { HeroButtonType } from './types';

export type HeroButtonProps = Pick<ButtonFilledProps, 'label' | 'href' | 'disabled' | 'icon'> & {
  type?: HeroButtonType;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

type HeroButtonPropsInternal = WithLayoutType<HeroButtonProps>;

export function HeroEventButton({ href, label, disabled, icon, onClick, type, layoutType }: HeroButtonPropsInternal) {
  const meta = type ? HERO_BUTTON_META[type] : undefined;
  const Icon = meta?.icon;

  return (
    <ButtonFilled
      size='l'
      onClick={onClick}
      href={href}
      target='_blank'
      disabled={meta?.disabled ?? disabled}
      label={meta?.label ?? label}
      icon={(Icon && <Icon />) ?? icon}
      fullWidth={['mobile', 'tablet'].includes(layoutType)}
    />
  );
}
