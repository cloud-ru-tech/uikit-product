import React, { FC, useCallback } from 'react';

import { DropdownDownInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { useLanguage } from '@sbercloud/uikit-product-utils';

import { DictionaryPropertyAsFn, textProvider, Texts } from '../../../helpers/texts-provider';
import { iconClass, StyledContainer } from './styled';

export interface IValueContainerProps {
  value?: React.ReactText[];
  placeholder?: string;
  valueFormatter?: (value?: React.ReactText[]) => string | React.ReactNode;
  disabled?: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const ValueContainer: FC<IValueContainerProps> = ({
  open,
  setOpen,
  value,
  placeholder,
  valueFormatter,
  disabled = false,
}) => {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
  const getVal = useCallback(() => {
    if (!value || !value.length) {
      return placeholder || textProvider<string>(languageCode, Texts.SelectValue);
    }

    return (
      valueFormatter?.(value) ||
      textProvider<DictionaryPropertyAsFn>(languageCode, Texts.Selected)({ count: value.length })
    );
  }, [value, languageCode, valueFormatter, placeholder]);

  return (
    <StyledContainer
      disabled={disabled}
      open={open}
      hasValue={Boolean(value && value.length)}
      onClick={
        disabled
          ? undefined
          : (): void => {
              setOpen(!open);
            }
      }
    >
      {getVal()}
      <DropdownDownInterfaceSVG className={iconClass} data-open={open} data-disabled={disabled} />
    </StyledContainer>
  );
};
