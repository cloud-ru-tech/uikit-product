import { ReactNode } from 'react';

import { extractSupportProps, useUniqueId, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { Mode, Orientation } from '../../constants';
import {
  ToggleGroupModeProvider,
  ToggleGroupNameProvider,
  ToggleGroupOnChangeProvider,
  ToggleGroupValueProvider,
} from '../../hooks';
import { Value } from '../../types';
import { Group } from './styled';

export type ToggleGroupProps<T extends Value = Value> = WithSupportProps<{
  children: ReactNode;
  mode: Mode;
  onChange: (value: T[]) => void;
  value?: T[];
  orientation?: Orientation;
  gap?: number;
  breakpoint?: number;
  className?: string;
}>;

export function ToggleGroup<T extends Value = Value>({
  children,
  mode,
  onChange,
  value = [],
  orientation = Orientation.Vertical,
  gap = 12,
  breakpoint = 0,
  className,
  ...rest
}: ToggleGroupProps<T>) {
  const name = useUniqueId('ToggleGroup');

  return (
    <ToggleGroupModeProvider value={mode}>
      <ToggleGroupNameProvider value={name}>
        <ToggleGroupOnChangeProvider value={onChange as (value: Value[]) => void}>
          <ToggleGroupValueProvider value={value}>
            <Group
              className={className}
              gap={gap}
              breakpoint={breakpoint}
              data-orientation={orientation}
              {...extractSupportProps(rest)}
            >
              {children}
            </Group>
          </ToggleGroupValueProvider>
        </ToggleGroupOnChangeProvider>
      </ToggleGroupNameProvider>
    </ToggleGroupModeProvider>
  );
}

ToggleGroup.mode = Mode;
ToggleGroup.orientation = Orientation;
