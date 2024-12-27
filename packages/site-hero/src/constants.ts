import { JSXElementConstructor } from 'react';

import { DownloadSVG, PlaySVG } from '@sbercloud/uikit-product-icons';

import { HeroButtonType } from './types';

export const FORMATS = {
  Online: 'online',
  Offline: 'offline',
  Hybrid: 'hybrid',
} as const;

export const FORMAT_LABELS = {
  [FORMATS.Online]: 'Онлайн',
  [FORMATS.Offline]: 'Офлайн',
  [FORMATS.Hybrid]: 'Гибрид',
};

export const AUDIENCES = {
  It: 'it',
  Students: 'students',
  Business: 'business',
} as const;

export const AUDIENCE_LABELS = {
  [AUDIENCES.It]: 'Для IT',
  [AUDIENCES.Students]: 'Для студентов',
  [AUDIENCES.Business]: 'Для бизнеса',
};

export const HERO_BUTTONS = {
  Registration: 'registration',
  RegistrationClosed: 'registration-closed',
  Watch: 'watch',
  WatchLater: 'watch-later',
  AdditionalMaterials: 'additional-materials',
} as const;

export const HERO_BUTTON_META: Record<
  HeroButtonType,
  {
    label: string;
    icon?: JSXElementConstructor<{ size?: number }>;
    disabled?: boolean;
  }
> = {
  [HERO_BUTTONS.Watch]: { label: 'Смотреть запись', icon: PlaySVG },
  [HERO_BUTTONS.WatchLater]: { label: 'Запись скоро будет', icon: PlaySVG, disabled: true },
  [HERO_BUTTONS.AdditionalMaterials]: { label: 'Получить материал', icon: DownloadSVG },
  [HERO_BUTTONS.Registration]: { label: 'Регистрация' },
  [HERO_BUTTONS.RegistrationClosed]: { label: 'Регистрация закрыта', disabled: true },
};

export const HERO_COLORS = {
  NeutralBackground1Level: 'neutral-background1-level',
  NeutralBackground: 'neutral-background',
} as const;
