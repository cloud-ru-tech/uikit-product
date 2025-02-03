import { ValueOf } from '@snack-uikit/utils';

import { TagSpecial, TagSpecialProps } from '../../helperComponents';
import { PLATFORM_TYPE } from './constants';

export type TagPlatformProps = {
  type: ValueOf<typeof PLATFORM_TYPE>;
  size: TagSpecialProps['size'];
};

const getTagSpecialArgs = (type: TagPlatformProps['type']): Pick<TagSpecialProps, 'text' | 'tip'> | null => {
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

export function TagPlatform({ type, size }: TagPlatformProps) {
  const tagArgs = getTagSpecialArgs(type);

  return tagArgs && <TagSpecial size={size} appearance='neutral' {...tagArgs} />;
}
