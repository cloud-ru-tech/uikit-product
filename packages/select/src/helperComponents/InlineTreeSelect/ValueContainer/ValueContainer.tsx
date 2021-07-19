import { DropdownDownInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { useLanguage } from '@sbercloud/uikit-react-localization';
import { FC, useCallback } from 'react';

import { DictionaryPropertyAsFn, Texts, textProvider } from '../../../helpers/texts-provider';
import { StyledContainer, iconClass } from './styled';

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
  const language = useLanguage({ onlyEnabledLanguage: true });
  const getVal = useCallback(() => {
    if (!value || !value.length) {
      return placeholder || textProvider<string>(language, Texts.selectValue);
    }

    return (
      valueFormatter?.(value) || textProvider<DictionaryPropertyAsFn>(language, Texts.selected)({ count: value.length })
    );
  }, [value, language]);

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
