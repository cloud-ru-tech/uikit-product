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
import { useLanguage } from '@sbercloud/uikit-product-utils';

import { textProvider, Texts } from './textsProvider';
import { FieldPhoneOptionsProps } from './types';

const DEFAULT_COUNTRY_CODES: FieldPhoneOptionsProps[] = [
  {
    id: 'Russia',
    mask: 'XXX XXX-XX-XX',
    content: {
      option: Texts.Russia,
      caption: '+7',
    },
    beforeContent: <RussiaSVG size={24} />,
  },
  {
    id: 'Belarus',
    mask: 'XXX XXX-XX-XX',
    content: {
      option: Texts.Belarus,
      caption: '+375',
    },
    beforeContent: <BelarusSVG size={24} />,
  },
  {
    id: 'Kazakhstan',
    mask: 'XXX XXX-XX-XX',
    content: {
      option: Texts.Kazakhstan,
      caption: '+7',
    },
    beforeContent: <KazakhstanSVG size={24} />,
  },
  {
    id: 'Armenia',
    mask: 'XX XXX-XXX',
    content: {
      option: Texts.Armenia,
      caption: '+374',
    },
    beforeContent: <ArmeniaSVG size={24} />,
  },
  {
    id: 'Kyrgyzstan',
    mask: 'XXX XXX-XXX',
    content: {
      option: Texts.Kyrgyzstan,
      caption: '+996',
    },
    beforeContent: <KyrgyzstanSVG size={24} />,
  },
  {
    id: 'Uzbekistan',
    mask: 'XX XXX-XX-XX',
    content: {
      option: Texts.Uzbekistan,
      caption: '+998',
    },
    beforeContent: <UzbekistanSVG size={24} />,
  },
  {
    id: 'Azerbaijan',
    mask: 'XX XXX-XX-XX',
    content: {
      option: Texts.Azerbaijan,
      caption: '+994',
    },
    beforeContent: <AzerbaijanSVG size={24} />,
  },
  {
    id: 'Tajikistan',
    mask: 'XXX XX-XX-XX',
    content: {
      option: Texts.Tajikistan,
      caption: '+992',
    },
    beforeContent: <TajikistanSVG size={24} />,
  },
  {
    id: 'Georgia',
    mask: 'XXX XXX-XXX',
    content: {
      option: Texts.Georgia,
      caption: '+995',
    },
    beforeContent: <GeorgiaSVG size={24} />,
  },
];

export function usePredefinedPhoneMasks() {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  return useMemo(
    () =>
      DEFAULT_COUNTRY_CODES.map(opt => ({
        ...opt,
        content: {
          ...opt.content,
          option: textProvider(languageCode, opt.content.option as Texts),
        },
      })),
    [languageCode],
  );
}
