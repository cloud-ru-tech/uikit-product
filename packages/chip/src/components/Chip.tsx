import { ChangeEvent, useCallback } from 'react';

import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-utils';

import { Size, Variant } from './constants';
import * as S from './styled';

export type ChipProps = {
  label: string;
  checked: boolean;
  handleChange(checked: boolean, e: ChangeEvent<HTMLInputElement>): void;
  variant?: Variant;
  disabled?: boolean;
  size?: Size;
  className?: string;
};

export function Chip({
  label,
  checked,
  handleChange,
  variant = Variant.Primary,
  size = Size.Medium,
  className = '',
  disabled = false,
  ...rest
}: WithSupportProps<ChipProps>) {
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      handleChange(!checked, e);
    },
    [checked, disabled, handleChange],
  );

  return (
    <S.ChipWrapper
      className={className}
      data-variant={variant}
      data-size={size}
      data-checked={checked || undefined}
      data-disabled={disabled || undefined}
      {...extractSupportProps(rest)}
    >
      <S.HiddenCheckbox type='checkbox' checked={checked} onChange={onChange} />
      {label}
    </S.ChipWrapper>
  );
}

Chip.variants = Variant;
Chip.sizes = Size;
