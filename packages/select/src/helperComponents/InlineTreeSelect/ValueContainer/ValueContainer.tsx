import { FC, useCallback } from 'react';

import { ArrowDownSVG } from '@sbercloud/icons';

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
  placeholder = 'Выберите значение',
  valueFormatter,
  disabled = false,
}) => {
  const getVal = useCallback(() => {
    if (!value || !value.length) {
      return placeholder;
    }

    return valueFormatter?.(value) || `Выбрано: ${value.length}`;
  }, [value]);

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
      <ArrowDownSVG className={iconClass} data-open={open} data-disabled={disabled} />
    </StyledContainer>
  );
};
