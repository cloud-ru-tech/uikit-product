import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-product-theme';

const { COLORS_SELECT } = DEPRECATED_EXPORT_VARS;

type IContainerType = {
  open: boolean;
  hasValue: boolean;
  disabled: boolean;
};

export const StyledContainer = styled.div<IContainerType>`
  position: relative;
  height: 44px;
  padding: 12px 8px;
  display: flex;
  align-items: center;
  background: ${(props): string =>
    props.disabled ? `var(${COLORS_SELECT.DISABLED_BACKGROUND})` : `var(${COLORS_SELECT.BACKGROUND})`};
  border: 1px solid
    ${(props): string =>
      props.open ? `var(${COLORS_SELECT.BORDER_FOCUS_COLOR})` : `var(${COLORS_SELECT.BORDER_COLOR})`};
  box-sizing: border-box;
  border-radius: 4px;
  color: ${({ disabled, hasValue }): string => {
    if (disabled) {
      return `var(${COLORS_SELECT.DISABLED_TEXT_COLOR})`;
    }

    if (hasValue) {
      return `var(${COLORS_SELECT.TEXT_COLOR})`;
    }

    return `var(${COLORS_SELECT.TEXT_COLOR})`;
  }};
  cursor: ${(props): string => (props.disabled ? 'default' : 'pointer')};
  &:hover {
    border: 1px solid
      ${({ disabled, open }): string => {
        if (disabled) {
          return `var(${COLORS_SELECT.DISABLED_BORDER_COLOR})`;
        }

        if (open) {
          return `var(${COLORS_SELECT.BORDER_FOCUS_COLOR})`;
        }

        return `var(${COLORS_SELECT.BORDER_HOVER_COLOR})`;
      }};
  }
`;

export const iconClass = css`
  position: absolute;
  top: 12px;
  right: 8px;
  color: var(${COLORS_SELECT.TEXT_COLOR});
  fill: var(${COLORS_SELECT.TEXT_COLOR});
  &[data-open='true'] {
    transform: rotate(180deg);
  }
  &[data-disabled='true'] {
    color: var(${COLORS_SELECT.DISABLED_TEXT_COLOR});
    fill: var(${COLORS_SELECT.DISABLED_TEXT_COLOR});
  }
`;
