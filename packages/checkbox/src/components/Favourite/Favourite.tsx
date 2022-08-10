import { useCallback } from 'react';

import { FavouriteInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { HiddenCheckbox, Label } from './styled';

export type FavouriteProps = {
  checked: boolean;
  disabled?: boolean;
  className?: string;
  handleChange(checked: boolean, e?: React.ChangeEvent<HTMLInputElement>): void;
};

export function Favourite({ checked, disabled, className, handleChange, ...rest }: WithSupportProps<FavouriteProps>) {
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      handleChange(!checked, e);
    },
    [disabled, checked, handleChange],
  );

  return (
    <Label
      className={className}
      data-checked={checked || undefined}
      data-disabled={disabled || undefined}
      {...extractSupportProps(rest)}
    >
      <HiddenCheckbox type='checkbox' checked={checked} disabled={disabled} onChange={onChange} />
      <FavouriteInterfaceSVG />
    </Label>
  );
}
