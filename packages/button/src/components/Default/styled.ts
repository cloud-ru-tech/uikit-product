import { styled } from '@linaria/react';
import { EXPORT_VARS } from '@sbercloud/uikit-theme';
import { TYPOGRAPHY_VARIABLES } from '@sbercloud/uikit-typography';

const { H_4, TEXT_2 } = TYPOGRAPHY_VARIABLES;
const { COLORS_BUTTON } = EXPORT_VARS;

export const ButtonComponent = styled.button`
  position: relative;
  border-radius: 4px;
  border: 0;
  outline: 0;
  cursor: pointer;
  display: inline-flex;
  white-space: nowrap;

  align-items: center;
  justify-content: center;

  box-sizing: border-box;

  ${TEXT_2};

  &[data-size='xxs'] {
    padding: 0;
  }

  &[data-size='xs'] {
    padding: 0 2px;
  }

  &[data-size='s'] {
    padding: 0 8px;
  }

  &[data-size='m'] {
    padding: 12px 16px;
  }

  &[data-variant='filled'] {
    color: var(${COLORS_BUTTON.FILLED_COLOR});
    fill: var(${COLORS_BUTTON.FILLED_ICON_COLOR});
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

  &[data-variant='outlined'] {
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
        border-color: var(${COLORS_BUTTON.OUTLINED_ACTIVE_BORDER});
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
        border-color: var(${COLORS_BUTTON.OUTLINED_DISABLED_BORDER});
      }
    }
  }

  &[data-variant='transparent'] {
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

      &:hover {
        background-color: transparent;
      }
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

  &[data-variant='table-menu'] {
    padding: 10px 12px;

    fill: var(${COLORS_BUTTON.TABLE_MENU_BUTTON_COLOR});
    background-color: transparent;
    &:hover {
      fill: var(${COLORS_BUTTON.TABLE_MENU_BUTTON_HOVER_COLOR});
    }
    &:active {
      fill: var(${COLORS_BUTTON.TABLE_MENU_BUTTON_ACTIVE_COLOR});
    }
    &:disabled {
      fill: var(${COLORS_BUTTON.TABLE_MENU_BUTTON_DISABLED_COLOR});

      &:hover {
        fill: var(${COLORS_BUTTON.TABLE_MENU_BUTTON_DISABLED_COLOR});
      }
    }
  }

  &[data-variant='filled-brand'] {
    color: var(${COLORS_BUTTON.FILLED_BRAND_COLOR});
    fill: var(${COLORS_BUTTON.FILLED_BRAND_COLOR});
    background-color: var(${COLORS_BUTTON.FILLED_BRAND_BG});
    &:hover {
      background-color: var(${COLORS_BUTTON.FILLED_BRAND_HOVER_BG});
    }
    &:active {
      background-color: var(${COLORS_BUTTON.FILLED_BRAND_ACTIVE_BG});
    }
    &:disabled {
      color: var(${COLORS_BUTTON.FILLED_BRAND_DISABLED_COLOR});
      fill: var(${COLORS_BUTTON.FILLED_BRAND_DISABLED_COLOR});
      background-color: var(${COLORS_BUTTON.FILLED_BRAND_DISABLED_BG});
    }
    &:focus-visible {
      background-color: var(${COLORS_BUTTON.FILLED_BRAND_FOCUS_BG});
    }
  }

  &[data-variant='white'] {
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
      box-shadow: 0 0 0 4px var(${COLORS_BUTTON.WHITE_FOCUS_OUTLINE});
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

    ${H_4};

    &:before {
      border-radius: 50px;
    }
    &:focus-visible {
      &:before {
        border-radius: 50px;
      }
    }

    &[data-size='s'] {
      ${TEXT_2};
    }
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px var(${COLORS_BUTTON.FOCUS_SHADOW});
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export const IconWrap = styled.div<{
  position: 'before' | 'after';
  setMargin: boolean;
}>`
  display: inline-flex;
  align-items: center;
  margin: ${({ position, setMargin }) => {
    if (!setMargin) {
      return '0px';
    }

    if (position === 'before') {
      return '0px 8px 0px 0px';
    }

    return '0px 0px 0px 8px';
  }};
`;
