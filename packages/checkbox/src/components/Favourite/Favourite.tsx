import { useCallback } from 'react';

import { FavouriteInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-utils';

import { Variants } from './constants';
import { HiddenCheckbox, Label } from './styled';

export type FavouriteProps = {
  checked: boolean;
  disabled?: boolean;
  className?: string;
  variant?: Variants;
  handleChange(checked: boolean, e?: React.ChangeEvent<HTMLInputElement>): void;
};

export const Favourite = ({
  checked,
  disabled,
  className,
  handleChange,
  variant = Variants.Weak,
  ...rest
}: WithSupportProps<FavouriteProps>) => {
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
      data-variant={variant}
      data-checked={checked || undefined}
      data-disabled={disabled || undefined}
      {...extractSupportProps(rest)}
    >
      <HiddenCheckbox type='checkbox' checked={checked} disabled={disabled} onChange={onChange} />
      <FavouriteInterfaceSVG />
    </Label>
  );
};

Favourite.variants = Variants;
