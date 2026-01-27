import { JSXElementConstructor } from 'react';

import { DownloadSVG, PlaySVG } from '@cloud-ru/uikit-product-icons';

import { HERO_EVENT_BUTTONS } from '../../constants';
import { HeroButtonType } from './types';

export const HERO_BUTTON_META: Record<
  HeroButtonType,
  {
    label: string;
    icon?: JSXElementConstructor<{ size?: number }>;
    disabled?: boolean;
  }
> = {
  [HERO_EVENT_BUTTONS.Watch]: { label: 'Смотреть запись', icon: PlaySVG },
  [HERO_EVENT_BUTTONS.WatchLater]: { label: 'Запись скоро будет', icon: PlaySVG, disabled: true },
  [HERO_EVENT_BUTTONS.AdditionalMaterials]: { label: 'Получить материал', icon: DownloadSVG },
  [HERO_EVENT_BUTTONS.Registration]: { label: 'Регистрация' },
  [HERO_EVENT_BUTTONS.RegistrationClosed]: { label: 'Регистрация закрыта', disabled: true },
};
