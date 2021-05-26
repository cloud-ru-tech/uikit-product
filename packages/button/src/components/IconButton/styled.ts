import { styled } from '@linaria/react';

import { EXPORT_VARS } from '@sbercloud/uikit-theme';

import { ResetButton } from '../ResetButton';

const { COLORS_ICON_BUTTON } = EXPORT_VARS;

export const Wrapper = styled(ResetButton)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: max-content;
  width: max-content;

  &[data-variant='blue'] {
    padding: 8px;
    margin: 4px;
    border-radius: 4px;

    fill: var(${COLORS_ICON_BUTTON.BLUE_COLOR});
    color: var(${COLORS_ICON_BUTTON.BLUE_COLOR});
    border: 1.5px solid var(${COLORS_ICON_BUTTON.BLUE_BORDER_COLOR});

    &:hover {
      fill: var(${COLORS_ICON_BUTTON.BLUE_COLOR_HOVER});
      color: var(${COLORS_ICON_BUTTON.BLUE_COLOR_HOVER});
      border-color: var(${COLORS_ICON_BUTTON.BLUE_BORDER_COLOR_HOVER});
    }

    &:active {
      fill: var(${COLORS_ICON_BUTTON.BLUE_COLOR_ACTIVE});
      color: var(${COLORS_ICON_BUTTON.BLUE_COLOR_ACTIVE});
      border-color: var(${COLORS_ICON_BUTTON.BLUE_BORDER_COLOR_ACTIVE});
    }

    &:disabled {
      fill: var(${COLORS_ICON_BUTTON.BLUE_COLOR_DISABLED});
      color: var(${COLORS_ICON_BUTTON.BLUE_COLOR_DISABLED});
      border-color: var(${COLORS_ICON_BUTTON.BLUE_BORDER_COLOR_DISABLED});
      cursor: not-allowed;
    }

    &:focus-visible {
      fill: var(${COLORS_ICON_BUTTON.BLUE_COLOR_FOCUS});
      color: var(${COLORS_ICON_BUTTON.BLUE_COLOR_FOCUS});
      border-color: var(${COLORS_ICON_BUTTON.BLUE_BORDER_COLOR_FOCUS});
      box-shadow: 0 0 0 4px var(${COLORS_ICON_BUTTON.BLUE_FOCUS_SHADOW});
    }
  }

  &[data-variant='white'] {
    padding: 8px;
    margin: 4px;
    border-radius: 4px;

    fill: var(${COLORS_ICON_BUTTON.WHITE_COLOR});
    color: var(${COLORS_ICON_BUTTON.WHITE_COLOR});
    border: 1.5px solid var(${COLORS_ICON_BUTTON.WHITE_BORDER_COLOR});

    &:hover {
      fill: var(${COLORS_ICON_BUTTON.WHITE_COLOR_HOVER});
      color: var(${COLORS_ICON_BUTTON.WHITE_COLOR_HOVER});
      border-color: var(${COLORS_ICON_BUTTON.WHITE_BORDER_COLOR_HOVER});
      background-color: var(${COLORS_ICON_BUTTON.WHITE_COMMON_BG});
    }

    &:active {
      fill: var(${COLORS_ICON_BUTTON.WHITE_COLOR_ACTIVE});
      color: var(${COLORS_ICON_BUTTON.WHITE_COLOR_ACTIVE});
      border-color: var(${COLORS_ICON_BUTTON.WHITE_BORDER_COLOR_ACTIVE});
      background-color: var(${COLORS_ICON_BUTTON.WHITE_COMMON_BG});
    }

    &:disabled {
      fill: var(${COLORS_ICON_BUTTON.WHITE_COLOR_DISABLED});
      color: var(${COLORS_ICON_BUTTON.WHITE_COLOR_DISABLED});
      border-color: var(${COLORS_ICON_BUTTON.WHITE_BORDER_COLOR_DISABLED});
      cursor: not-allowed;
    }

    &:focus-visible {
      fill: var(${COLORS_ICON_BUTTON.WHITE_COLOR_FOCUS});
      color: var(${COLORS_ICON_BUTTON.WHITE_COLOR_FOCUS});
      border-color: var(${COLORS_ICON_BUTTON.WHITE_BORDER_COLOR_FOCUS});
      background-color: var(${COLORS_ICON_BUTTON.WHITE_COMMON_BG});
      box-shadow: 0 0 0 4px var(${COLORS_ICON_BUTTON.WHITE_FOCUS_SHADOW});
    }
  }

  &[data-variant='header'] {
    fill: var(${COLORS_ICON_BUTTON.HEADER_COLOR});
    color: var(${COLORS_ICON_BUTTON.HEADER_COLOR});

    &:hover {
      fill: var(${COLORS_ICON_BUTTON.HEADER_COLOR_HOVER});
      color: var(${COLORS_ICON_BUTTON.HEADER_COLOR_HOVER});
    }
  }

  &[data-variant='header-menu'] {
    fill: var(${COLORS_ICON_BUTTON.HEADER_MENU_COLOR});
    color: var(${COLORS_ICON_BUTTON.HEADER_MENU_COLOR});

    &:hover {
      fill: var(${COLORS_ICON_BUTTON.HEADER_MENU_COLOR_HOVER});
      color: var(${COLORS_ICON_BUTTON.HEADER_MENU_COLOR_HOVER});
    }
  }

  &[data-variant='sidebar'] {
    fill: var(${COLORS_ICON_BUTTON.SIDEBAR_COLOR});
    color: var(${COLORS_ICON_BUTTON.SIDEBAR_COLOR});

    &:hover {
      fill: var(${COLORS_ICON_BUTTON.SIDEBAR_COLOR_HOVER});
      color: var(${COLORS_ICON_BUTTON.SIDEBAR_COLOR_HOVER});
    }
  }
`;
