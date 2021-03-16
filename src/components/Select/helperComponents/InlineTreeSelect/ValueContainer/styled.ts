import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { COLORS_SELECT } from 'theme/color/vars';

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
  background: ${(props): string =>
    props.disabled
      ? `var(${COLORS_SELECT.DISABLED_BACKGROUND})`
      : `var(${COLORS_SELECT.BACKGROUND})`};
  border: 1px solid ${(props): string =>
    props.open
      ? `var(${COLORS_SELECT.BORDER_FOCUS_COLOR})`
      : `var(${COLORS_SELECT.BORDER_COLOR})`};
  box-sizing: border-box;
  border-radius: 4px;
  cursor: ${(props): string => (props.disabled ? 'default' : 'pointer')};
  color: ${({ disabled, hasValue }): string => {
    if (disabled) {
      return `${COLORS_SELECT.DISABLED_TEXT_COLOR}`;
    }

    if (hasValue) {
      return `${COLORS_SELECT.TEXT_COLOR}`;
    }

    return `${COLORS_SELECT.TEXT_COLOR}`;
  }}

  &:hover {
    border: 1px solid
      ${({ disabled, open }): string => {
        if (disabled) {
          return `${COLORS_SELECT.DISABLED_BORDER_COLOR}`;
        }

        if (open) {
          return `${COLORS_SELECT.BORDER_FOCUS_COLOR}`;
        }

        return `${COLORS_SELECT.BORDER_HOVER_COLOR}`;
      }};
  }
`;

export const iconClass = css`
  color: var(${COLORS_SELECT.TEXT_COLOR});
  fill: var(${COLORS_SELECT.TEXT_COLOR});
  &[data-open='true'] {
    transform: rotate(180deg);
  }
`;

export const iconWrapperClass = css`
  position: absolute;
  top: 12px;
  right: 8px;
`;
