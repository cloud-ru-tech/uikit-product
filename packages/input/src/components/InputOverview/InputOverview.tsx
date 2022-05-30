import { forwardRef } from 'react';

import { SimpleInput } from '@sbercloud/uikit-product-input-private';

import { InputMaster, InputMasterProps } from '../../helperComponents';

export type InputOverviewProps = Omit<InputMasterProps, 'children'> & {
  onMoreButtonClick: () => void;
  moreButtonTooltipText?: string;
  placeholder?: string;
};

const ForwardedInputOverview = forwardRef<HTMLInputElement, InputOverviewProps>(
  ({ onMoreButtonClick, moreButtonTooltipText, placeholder, ...props }, ref) => (
    <InputMaster {...props}>
      {props => (
        <SimpleInput
          {...props}
          placeholder={placeholder}
          moreButton={{ onClick: onMoreButtonClick, tooltipText: moreButtonTooltipText }}
          ref={ref}
        />
      )}
    </InputMaster>
  ),
);

export const InputOverview = ForwardedInputOverview as typeof ForwardedInputOverview & {
  sizes: typeof InputMaster.sizes;
};

InputOverview.sizes = InputMaster.sizes;
