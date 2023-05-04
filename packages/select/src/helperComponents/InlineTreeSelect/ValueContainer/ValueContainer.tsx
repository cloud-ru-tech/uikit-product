import { ReactNode, useCallback } from 'react';

import { DropdownDownInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { useLanguage } from '@sbercloud/uikit-product-utils';

import { DictionaryPropertyAsFn, textProvider, Texts } from '../../../helpers/texts-provider';
import { iconClass, StyledContainer } from './styled';

type ReactText = (string | number)[];

export type ValueContainerProps = {
  value?: ReactText;
  placeholder?: string;
  valueFormatter?: (value?: ReactText) => ReactNode;
  disabled?: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export function ValueContainer({
  open,
  setOpen,
  value,
  placeholder,
  valueFormatter,
  disabled = false,
}: ValueContainerProps) {
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
}
