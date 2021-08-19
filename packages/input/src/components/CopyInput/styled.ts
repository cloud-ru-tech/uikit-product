import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-theme';

const { COLORS_INPUT } = DEPRECATED_EXPORT_VARS;

const copyButtonClassName = css`
  margin-right: -8px;
`;
const StyledInput = styled.div<{ hasSecurityIcon: boolean }>`
  flex-grow: 1;
  box-sizing: border-box;
  width: 100%;
  font-family: SB Sans Interface;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  outline: 0;
  height: 36px;
  padding: ${({ security }) => (security ? '8px 64px 8px 12px' : '8px 36px 8px 12px')};
  background-color: var(${COLORS_INPUT.COPY_INPUT_BACKGROUND});
  border: 0;
  border-radius: 2px;
  color: var(${COLORS_INPUT.COPY_INPUT_COLOR});
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  &::placeholder {
    color: var(${COLORS_INPUT.INPUT_DISABLED_COLOR});
  }

  &:hover {
    cursor: pointer;
  }
`;

const Label = styled.span<{ minWidth: string }>`
  min-width: ${(props): string => props.minWidth};
  margin-right: 12px;
  color: #a0a0a0;
`;

const StyledWrap = styled.div`
  display: flex;
  max-width: 100%;
  flex-direction: row;
  align-items: center;
`;

const StyledInputWrapper = styled.div<{ labelMinWidth?: string }>`
  position: relative;
  width: ${props => (props.labelMinWidth ? `calc(100% - ${props.labelMinWidth})` : '100%')};
`;

const StyledIconWrapper = styled.div<{ right: number }>`
  position: absolute;
  top: 0;
  right: ${({ right }) => `${right}px`};
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
`;

const securityButtonClassName = css`
  &[data-variant='table-menu'] {
    padding: 4px;

    fill: var(${COLORS_INPUT.COPY_INPUT_ICON_COLOR});
    background: var(${COLORS_INPUT.COPY_INPUT_ICON_BACKGROUND_COLOR});

    &:hover {
      fill: var(${COLORS_INPUT.COPY_INPUT_ICON_HOVER_COLOR});
      background: var(${COLORS_INPUT.COPY_INPUT_ICON_BACKGROUND_COLOR});
    }
  }
`;

export {
  Label,
  StyledWrap,
  StyledInput,
  StyledIconWrapper,
  StyledInputWrapper,
  copyButtonClassName,
  securityButtonClassName,
};
