import { styled } from '@linaria/react';

interface IContainerType {
  open: boolean;
  hasValue: boolean;
  disabled: boolean;
}

export const StyledContainer = styled.div<IContainerType>`
  position: relative;
  height: 44px;
  padding: 12px 8px;
  display: flex;
  align-items: center;
  background: ${(props): string => (props.disabled ? '#f2f2f2' : '#ffffff')};
  border: 1px solid ${(props): string => (props.open ? '#484bd5' : '#d2d2d2')};
  box-sizing: border-box;
  border-radius: 4px;
  cursor: ${(props): string => (props.disabled ? 'default' : 'pointer')};
  color: ${({ disabled, hasValue }): string => {
    if (disabled) {
      return '#a0a0a0';
    }

    if (hasValue) {
      return '#1b1b1b';
    }

    return '#6C6C6C';
  }}

  &:hover {
    border: 1px solid
      ${({ disabled, open }): string => {
        if (disabled) {
          return '#d2d2d2';
        }

        if (open) {
          return '#484bd5';
        }

        return '#aaabfc';
      }};
  }
`;
