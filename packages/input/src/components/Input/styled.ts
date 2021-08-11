import { styled } from '@linaria/react';

import { MoreInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-theme';

const { COLORS_INPUT, COLORS_BUTTON } = DEPRECATED_EXPORT_VARS;

export const StyledInput = styled.input<{ allowCopy?: boolean; paddingRight?: number }>`
  flex-grow: 1;
  box-sizing: border-box;
  width: 100%;
  font-family: SB Sans Interface;
  color: var(${COLORS_INPUT.INPUT_TEXT_COLOR});
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  outline: 0;
  background-color: var(${COLORS_INPUT.INPUT_BG});
  border: 1px solid var(${COLORS_INPUT.INPUT_BORDER});
  border-radius: 4px;
  height: 44px;
  padding: ${({ paddingRight }) => (paddingRight ? `12px ${paddingRight}px 12px 12px` : '12px')};

  &::placeholder {
    color: var(${COLORS_INPUT.INPUT_PLACEHOLDER_COLOR});
  }

  &[data-type='number'] {
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
    -moz-appearance: textfield;
    &:hover,
    &:focus {
      -moz-appearance: number-input;
    }
  }

  &[data-type='embed'] {
    height: 40px;
    padding: ${({ paddingRight }) => (paddingRight ? `10px ${paddingRight}px 10px 12px` : '10px 12px')};
  }

  &:not([data-disabled='true']):hover {
    background-color: var(${COLORS_INPUT.INPUT_HOVER_BACKGROUND});
    border: 1px solid var(${COLORS_INPUT.INPUT_HOVER_BORDER});
    &::placeholder {
      color: var(${COLORS_INPUT.INPUT_HOVER_PLACEHOLDER_COLOR});
    }
  }

  &:focus {
    background-color: var(${COLORS_INPUT.INPUT_FOCUS_BACKGROUND});
    border: 1px solid var(${COLORS_INPUT.INPUT_FOCUS_BORDER});
  }

  &[data-disabled='true'] {
    background-color: var(${COLORS_INPUT.INPUT_DISABLED_BACKGROUND});
    border: 1px solid var(${COLORS_INPUT.INPUT_DISABLED_BORDER});
    color: var(${COLORS_INPUT.INPUT_DISABLED_COLOR});
    &::placeholder {
      color: var(${COLORS_INPUT.INPUT_DISABLED_COLOR});
    }
    &:hover {
      cursor: ${({ allowCopy }) => (allowCopy ? 'pointer' : 'not-allowed')};
    }
  }

  &[data-type='embed'] {
    border: 0 !important;
    border-radius: 0;
  }

  &[data-error] {
    border: 1px solid var(${COLORS_INPUT.INPUT_ERROR_BORDER});

    &:hover,
    &:focus {
      border: 1px solid var(${COLORS_INPUT.INPUT_ERROR_BORDER});
    }
  }

  &[data-type='security'] {
    &::-webkit-contacts-auto-fill-button,
    &::-webkit-credentials-auto-fill-button {
      visibility: hidden;
      display: none;
      pointer-events: none;
      height: 0;
      width: 0;
      margin: 0;
    }
  }
`;

export const OpenDialogButtonWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-left: 1px solid var(${COLORS_INPUT.INPUT_BORDER});
  fill: var(${COLORS_INPUT.INPUT_DISABLED_COLOR});
  &:hover {
    color: var(${COLORS_BUTTON.TRANSPARENT_HOVER_COLOR});
    background-color: var(${COLORS_BUTTON.TRANSPARENT_HOVER_BG});
  }
`;

export const OpenDialogButton = styled(MoreInterfaceSVG)`
  margin: 0 12px;
  transform: rotate(90deg);
`;

export const BasicButtonWrapper = styled.div`
  display: flex;
  margin-right: 12px;
`;

export const StyledClearButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  margin-right: 8px;
  fill: var(${COLORS_INPUT.INPUT_ICON_COLOR});
  :hover {
    fill: var(${COLORS_INPUT.INPUT_HOVER_BORDER});
  }
`;

export const StyledSecurityButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  margin: 0 8px 0 0;
  color: var(${COLORS_INPUT.INPUT_ICON_COLOR});
  fill: var(${COLORS_INPUT.INPUT_ICON_COLOR});
  :hover {
    color: var(${COLORS_INPUT.INPUT_HOVER_BORDER});
    fill: var(${COLORS_INPUT.INPUT_HOVER_BORDER});
  }
`;

export const Label = styled.span<{ minWidth: string }>`
  min-width: ${(props): string => props.minWidth};
  margin-right: 12px;
  color: #a0a0a0;
`;

export const StyledWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const StyledInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const StyledIconWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
`;
