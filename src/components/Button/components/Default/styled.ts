import { COLORS_BUTTON } from 'theme/color/vars';
import { styled } from '@linaria/react';

export const ButtonComponent = styled.button`
  position: relative;
  border-radius: 4px;
  border: 0;
  outline: 0;
  cursor: pointer;
  display: inline-flex;

  align-items: center;
  justify-content: center;

  box-sizing: border-box;

  &[data-size='xs'] {
    padding: 0 2px;
  }

  &[data-size='s'] {
    padding: 0 8px;
  }

  &[data-size='m'] {
    padding: 12px 16px;
  }

  &[data-type='filled'] {
    color: var(${COLORS_BUTTON.FILLED_COLOR});
    fill: var(${COLORS_BUTTON.FILLED_COLOR});
    background-color: var(${COLORS_BUTTON.FILLED_BG});
    &:hover {
      background-color: var(${COLORS_BUTTON.FILLED_HOVER_BG});
    }
    &:active {
      background-color: var(${COLORS_BUTTON.FILLED_ACTIVE_BG});
    }
    &:disabled {
      color: var(${COLORS_BUTTON.FILLED_DISABLED_COLOR});
      fill: var(${COLORS_BUTTON.FILLED_DISABLED_COLOR});
      background-color: var(${COLORS_BUTTON.FILLED_DISABLED_BG});
    }
    &:focus-visible {
      background-color: var(${COLORS_BUTTON.FILLED_FOCUS_BG});
    }
  }

  &[data-type='outlined'] {
    color: var(${COLORS_BUTTON.OUTLINED_COLOR});
    fill: var(${COLORS_BUTTON.OUTLINED_COLOR});
    background-color: transparent;

    &:before {
      content: '';
      position: absolute;
      bottom: -1px;
      right: -1px;
      left: -1px;
      top: -1px;
      border-width: 1px;
      border-style: solid;
      border-color: var(${COLORS_BUTTON.OUTLINED_BORDER});
      border-radius: 4px;
    }
    &:hover {
      color: var(${COLORS_BUTTON.OUTLINED_HOVER_COLOR});
      fill: var(${COLORS_BUTTON.OUTLINED_HOVER_COLOR});
      &:before {
        border-color: var(${COLORS_BUTTON.OUTLINED_HOVER_BORDER});
      }
    }
    &:active {
      color: var(${COLORS_BUTTON.OUTLINED_ACTIVE_COLOR});
      fill: var(${COLORS_BUTTON.OUTLINED_ACTIVE_COLOR});
      &:before {
        border-color: var(${COLORS_BUTTON.OUTLINED_ACTIVE_COLOR});
      }
    }
    &:focus-visible {
      color: var(${COLORS_BUTTON.OUTLINED_FOCUS_COLOR});
      fill: var(${COLORS_BUTTON.OUTLINED_FOCUS_COLOR});
    }

    &:disabled {
      color: var(${COLORS_BUTTON.OUTLINED_DISABLED_COLOR});
      fill: var(${COLORS_BUTTON.OUTLINED_DISABLED_COLOR});
      &:before {
        border-color: var(${COLORS_BUTTON.OUTLINED_DISABLED_COLOR});
      }
    }
  }

  &[data-type='transparent'] {
    color: var(${COLORS_BUTTON.TRANSPARENT_COLOR});
    fill: var(${COLORS_BUTTON.TRANSPARENT_COLOR});
    background-color: transparent;
    &:hover {
      color: var(${COLORS_BUTTON.TRANSPARENT_HOVER_COLOR});
      fill: var(${COLORS_BUTTON.TRANSPARENT_HOVER_COLOR});
      background-color: var(${COLORS_BUTTON.TRANSPARENT_HOVER_BG});
    }
    &:active {
      color: var(${COLORS_BUTTON.TRANSPARENT_ACTIVE_COLOR});
      fill: var(${COLORS_BUTTON.TRANSPARENT_ACTIVE_COLOR});
      background-color: var(${COLORS_BUTTON.TRANSPARENT_ACTIVE_BG});
    }
    &:disabled {
      color: var(${COLORS_BUTTON.TRANSPARENT_DISABLED_COLOR});
      fill: var(${COLORS_BUTTON.TRANSPARENT_DISABLED_COLOR});
    }
    &:focus-visible {
      color: var(${COLORS_BUTTON.TRANSPARENT_FOCUS_COLOR});
      fill: var(${COLORS_BUTTON.TRANSPARENT_FOCUS_COLOR});
      background-color: var(${COLORS_BUTTON.TRANSPARENT_FOCUS_BG});
      &:before {
        content: '';
        position: absolute;
        bottom: -1px;
        right: -1px;
        left: -1px;
        top: -1px;
        border-width: 1px;
        border-style: solid;
        border-color: var(${COLORS_BUTTON.TRANSPARENT_FOCUS_BORDER});
        border-radius: 4px;
      }
    }
  }

  &[data-type='white'] {
    fill: var(${COLORS_BUTTON.WHITE_COLOR});
    color: var(${COLORS_BUTTON.WHITE_COLOR});
    background-color: var(${COLORS_BUTTON.WHITE_BG});
    &:hover {
      fill: var(${COLORS_BUTTON.WHITE_HOVER_COLOR});
      color: var(${COLORS_BUTTON.WHITE_HOVER_COLOR});
      background-color: var(${COLORS_BUTTON.WHITE_HOVER_BG});
    }
    &:active {
      fill: var(${COLORS_BUTTON.WHITE_ACTIVE_COLOR});
      color: var(${COLORS_BUTTON.WHITE_ACTIVE_COLOR});
      background-color: var(${COLORS_BUTTON.WHITE_ACTIVE_BG});
    }
    &:disabled {
      fill: var(${COLORS_BUTTON.WHITE_DISABLED_COLOR});
      color: var(${COLORS_BUTTON.WHITE_DISABLED_COLOR});
      background-color: var(${COLORS_BUTTON.WHITE_DISABLED_BG});
    }
    &:focus-visible {
      fill: var(${COLORS_BUTTON.WHITE_FOCUS_COLOR});
      color: var(${COLORS_BUTTON.WHITE_FOCUS_COLOR});
      background-color: var(${COLORS_BUTTON.WHITE_FOCUS_BG});
      box-shadow: 0px 0px 0px 4px var(${COLORS_BUTTON.WHITE_FOCUS_OUTLINE});
      &:before {
        content: '';
        position: absolute;
        bottom: -1px;
        right: -1px;
        left: -1px;
        top: -1px;
        border-width: 1px;
        border-style: solid;
        border-color: var(${COLORS_BUTTON.WHITE_FOCUS_BORDER});
        border-radius: 4px;
      }
    }
  }

  &[data-round='true'] {
    border-radius: 50px;
    padding: 4px 12px;
    line-height: 20px;
    &:before {
      border-radius: 50px;
    }
    &:focus-visible {
      &:before {
        border-radius: 50px;
      }
    }
  }

  &:focus-visible {
    box-shadow: 0px 0px 0px 4px var(${COLORS_BUTTON.FOCUS_SHADOW});
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export const IconWrap = styled.div<{ position: 'before' | 'after' }>`
  display: inline-flex;
  align-items: center;
  margin: ${({ position }) =>
    position === 'before' ? '0px 8px 0px 0px' : '0px 0px 0px 8px'};
`;
