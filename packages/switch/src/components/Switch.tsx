import { cx } from '@linaria/core';
import { useMemo } from 'react';
import * as React from 'react';
import ReactSwitch from 'react-switch';

import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-utils';

import { Size, SizePropsMap } from './constants';
import { Wrapper, switchClassName, switchClassNameChecked, switchClassNameDisabled } from './styled';

export type SwitchProps = {
  checked: boolean;
  onChange(checked: boolean, e?: React.SyntheticEvent<MouseEvent | KeyboardEvent> | MouseEvent): void;
  className?: string;
  disabled?: boolean;
  size?: Size;
};

export function Switch({
  checked,
  onChange,
  className,
  disabled = false,
  size = Size.Small,
  ...rest
}: WithSupportProps<SwitchProps>) {
  const { height, width, handleDiameter } = useMemo(() => SizePropsMap[size], [size]);
  return (
    <Wrapper data-disabled={disabled || undefined} className={className} {...extractSupportProps(rest)}>
      <ReactSwitch
        handleDiameter={handleDiameter}
        height={height}
        width={width}
        uncheckedIcon={false}
        checkedIcon={false}
        activeBoxShadow=''
        className={cx(switchClassName, checked && switchClassNameChecked, disabled && switchClassNameDisabled)}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
    </Wrapper>
  );
}

Switch.sizes = Size;
