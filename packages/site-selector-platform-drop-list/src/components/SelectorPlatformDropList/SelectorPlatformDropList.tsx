import { ReactNode, useMemo } from 'react';

import { CloudSVG } from '@sbercloud/uikit-product-icons';
import { WithLayoutType } from '@sbercloud/uikit-product-utils';

import { SelectorPlatformDropListPrivate } from '../../helperComponents';
import { Item, MultipleSelectorPlatformDropListProps, SingleSelectorPlatformDropListProps } from '../../types';
import { PLATFORMS } from './platforms';

export type PlatformType = 'advanced' | 'evolution' | 'vmware' | 'all';

export type Platform = {
  /** Тип элемента */
  type: PlatformType;
  /** Колбек клика на элемент */
  onClick?: () => void;
};

type BaseSelectorPlatformDropListProps = WithLayoutType<{
  /** Список элементов droplist */
  items: Array<Platform>;
  /** Нижняя часть под списком droplist */
  footer?: ReactNode;
}>;

export type SelectorPlatformDropListProps = BaseSelectorPlatformDropListProps &
  (MultipleSelectorPlatformDropListProps | SingleSelectorPlatformDropListProps);

export function SelectorPlatformDropList({
  items,
  value,
  footer,
  onChange,
  layoutType,
  mode,
}: SelectorPlatformDropListProps) {
  const selection = useMemo(
    () =>
      mode === 'multiple'
        ? ({
            value,
            onChange,
            mode: 'multiple',
          } as MultipleSelectorPlatformDropListProps)
        : ({
            value,
            onChange,
            mode: 'single',
          } as SingleSelectorPlatformDropListProps),
    [mode, value, onChange],
  );

  const itemsView: Array<Item> = useMemo(
    () => items.map(({ type, onClick }: Platform) => ({ ...PLATFORMS[type], onClick })),
    [items],
  );

  return (
    <SelectorPlatformDropListPrivate
      layoutType={layoutType === 'tablet' ? 'mobile' : layoutType}
      items={itemsView}
      title={'Облачные платформы'}
      baseTitle={'Все платформы'}
      baseIcon={CloudSVG}
      footer={footer}
      {...selection}
    />
  );
}
