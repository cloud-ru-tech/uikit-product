import { useMemo } from 'react';

import {
  ArmeniaSVG,
  AzerbaijanSVG,
  BelarusSVG,
  GeorgiaSVG,
  KazakhstanSVG,
  KyrgyzstanSVG,
  RussiaSVG,
  TajikistanSVG,
  UzbekistanSVG,
} from '@sbercloud/uikit-product-icons';
import { useLocale } from '@sbercloud/uikit-product-locale';

export function usePredefinedPhoneMasks() {
  const { t } = useLocale('FieldsPredefined');

  return useMemo(
    () => [
      {
        id: 'Russia',
        mask: 'XXX XXX-XX-XX',
        content: {
          option: t(`FieldPhone.russia`),
          caption: '+7',
        },
        beforeContent: <RussiaSVG size={24} />,
      },
      {
        id: 'Belarus',
        mask: 'XXX XXX-XX-XX',
        content: {
          option: t(`FieldPhone.belarus`),
          caption: '+375',
        },
        beforeContent: <BelarusSVG size={24} />,
      },
      {
        id: 'Kazakhstan',
        mask: 'XXX XXX-XX-XX',
        content: {
          option: t(`FieldPhone.kazakhstan`),
          caption: '+7',
        },
        beforeContent: <KazakhstanSVG size={24} />,
      },
      {
        id: 'Armenia',
        mask: 'XX XXX-XXX',
        content: {
          option: t(`FieldPhone.armenia`),
          caption: '+374',
        },
        beforeContent: <ArmeniaSVG size={24} />,
      },
      {
        id: 'Kyrgyzstan',
        mask: 'XXX XXX-XXX',
        content: {
          option: t(`FieldPhone.kyrgyzstan`),
          caption: '+996',
        },
        beforeContent: <KyrgyzstanSVG size={24} />,
      },
      {
        id: 'Uzbekistan',
        mask: 'XX XXX-XX-XX',
        content: {
          option: t(`FieldPhone.uzbekistan`),
          caption: '+998',
        },
        beforeContent: <UzbekistanSVG size={24} />,
      },
      {
        id: 'Azerbaijan',
        mask: 'XX XXX-XX-XX',
        content: {
          option: t(`FieldPhone.azerbaijan`),
          caption: '+994',
        },
        beforeContent: <AzerbaijanSVG size={24} />,
      },
      {
        id: 'Tajikistan',
        mask: 'XXX XX-XX-XX',
        content: {
          option: t(`FieldPhone.tajikistan`),
          caption: '+992',
        },
        beforeContent: <TajikistanSVG size={24} />,
      },
      {
        id: 'Georgia',
        mask: 'XXX XXX-XXX',
        content: {
          option: t(`FieldPhone.georgia`),
          caption: '+995',
        },
        beforeContent: <GeorgiaSVG size={24} />,
      },
    ],
    [t],
  );
}
