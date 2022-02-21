import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Wrapper = styled.div`
  cursor: pointer;
  &[data-disabled] {
    cursor: not-allowed;
  }
`;

export const switchClassNameDisabled = css``;

export const switchClassName = css`
  opacity: 1 !important;
  background-color: var(${COLORS.BACKGROUND_INACTIVE});

  .react-switch-bg {
    background: unset !important;
    cursor: unset !important;
  }
  
  .react-switch-handle {
    cursor: unset !important;
    background-color: var(${COLORS.HANDLE_INACTIVE}) !important;
  }
  
  &.${switchClassNameDisabled} {
    .react-switch-handle {
      background-color: var(${COLORS.HANDLE_INACTIVE_DISABLED}) !important;
    }
  }

  &:not(.${switchClassNameDisabled}):hover {
      background-color: var(${COLORS.BACKGROUND_INACTIVE_HOVERED});
    }
  }

  &.${switchClassNameDisabled} {
    background-color: var(${COLORS.BACKGROUND_INACTIVE_DISABLED});
  }
`;

export const switchClassNameChecked = css`
  background-color: var(${COLORS.BACKGROUND_ACTIVE});

  &:not(.${switchClassNameDisabled}):hover {
    background-color: var(${COLORS.BACKGROUND_ACTIVE_HOVERED});
  }
  
  .react-switch-handle {
    background-color: var(${COLORS.HANDLE_ACTIVE}) !important;
  }

  &.${switchClassNameDisabled} {
    background-color: var(${COLORS.BACKGROUND_ACTIVE_DISABLED});

    .react-switch-handle {
      background-color: var(${COLORS.HANDLE_ACTIVE_DISABLED}) !important;
    }
  }
}`;
