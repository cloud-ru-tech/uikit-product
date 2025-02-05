import { ValueOf } from '@snack-uikit/utils';

import { TagPredefinedCommonProps, TagProps } from '../types';

export const PLATFORM_TYPE = {
  Evolution: 'evolution',
  Advanced: 'advanced',
  MlSpace: 'ml-space',
  Vmware: 'vmware',
} as const;

export type TagPlatformProps = TagPredefinedCommonProps & {
  type: ValueOf<typeof PLATFORM_TYPE>;
  variant: 'platform';
};

export const getTagPlatformProps = (type: TagPlatformProps['type']): TagProps => {
  switch (type) {
    case PLATFORM_TYPE.Evolution:
      return {
        text: 'Evolution',
        tip: 'Публичное российское облако на базе open source',
      };
    case PLATFORM_TYPE.Advanced:
      return {
        text: 'Advanced',
        tip: '60+ IaaS- и PaaS-сервисов для развития инфраструктуры',
      };
    case PLATFORM_TYPE.MlSpace:
      return {
        text: 'ML Space',
        tip: 'Суперкомпьютеры и ML для создания приложений',
      };

    case PLATFORM_TYPE.Vmware:
      return {
        text: 'Облако VM Ware',
        tip: 'Облачная инфраструктура на базе технологий VMware',
      };
    default:
      return null;
  }
};
