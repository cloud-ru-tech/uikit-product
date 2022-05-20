import { styled } from '@linaria/react';

import { ANIMATIONS } from '@sbercloud/uikit-product-utils';

import { ToggleCardBoxCaption } from '../ToggleCardBoxCaption';
import { ToggleCardBoxDescription } from '../ToggleCardBoxDescription';
import { ToggleCardBoxIcon } from '../ToggleCardBoxIcon';
import { ToggleCardBoxInput } from '../ToggleCardBoxInput';
import { ToggleCardBoxTitle } from '../ToggleCardBoxTitle';
import {
  CAPTION_COLORS,
  COLORS,
  DESCRIPTION_COLORS,
  GREEN_DARK_THEME,
  GREEN_THEME,
  ICON_COLORS,
  PURPLE_DARK_THEME,
  PURPLE_THEME,
  TITLE_COLORS,
} from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const ToggleCardBox = styled.span`
  border-radius: 4px;
  border: 1px solid var(${COLORS.border.unselected.default});
  box-sizing: border-box;
  cursor: pointer;
  height: 100%;
  padding: 12px;
  transition: ${ANIMATIONS.TRANSITION};
  transition-property: background-color, border-color;

  ${ToggleCardBoxTitle} {
    color: var(${TITLE_COLORS.text.unselected.default});
    transition: color ${ANIMATIONS.TRANSITION};
  }

  ${ToggleCardBoxDescription} {
    color: var(${DESCRIPTION_COLORS.text.unselected.default});
    transition: color ${ANIMATIONS.TRANSITION};
  }

  ${ToggleCardBoxCaption} {
    color: var(${CAPTION_COLORS.text.default});
    transition: color ${ANIMATIONS.TRANSITION};
  }

  ${ToggleCardBoxIcon} {
    fill: var(${ICON_COLORS.fill.unselected.default});
    transition: fill ${ANIMATIONS.TRANSITION};
  }

  &:hover {
    border-color: var(${COLORS.border.unselected.hover});

    ${ToggleCardBoxIcon} {
      fill: var(${ICON_COLORS.fill.unselected.hover});
    }
  }

  ${ToggleCardBoxInput}:focus-visible + & {
    outline: 5px auto -webkit-focus-ring-color;
  }

  ${ToggleCardBoxInput}:disabled + & {
    background-color: var(${COLORS.background.unselected.disabled});
    border-color: var(${COLORS.border.unselected.disabled});
    cursor: not-allowed;

    ${ToggleCardBoxTitle} {
      color: var(${TITLE_COLORS.text.unselected.disabled});
    }

    ${ToggleCardBoxDescription} {
      color: var(${DESCRIPTION_COLORS.text.unselected.disabled});
    }

    ${ToggleCardBoxCaption} {
      color: var(${CAPTION_COLORS.text.disabled});
    }

    ${ToggleCardBoxIcon} {
      fill: var(${ICON_COLORS.fill.unselected.disabled});
    }
  }

  ${ToggleCardBoxInput}:checked + & {
    background-color: var(${COLORS.background.selected.default});
    border-color: var(${COLORS.border.selected.default});

    ${ToggleCardBoxIcon} {
      fill: var(${ICON_COLORS.fill.selected.default});
    }

    &:hover {
      border-color: var(${COLORS.border.selected.hover});

      ${ToggleCardBoxIcon} {
        fill: var(${ICON_COLORS.fill.selected.hover});
      }
    }
  }

  ${ToggleCardBoxInput}:checked:disabled + & {
    background-color: var(${COLORS.background.selected.disabled});
    border-color: var(${COLORS.border.selected.disabled});

    ${ToggleCardBoxTitle} {
      color: var(${TITLE_COLORS.text.selected.disabled});
    }

    ${ToggleCardBoxDescription} {
      color: var(${DESCRIPTION_COLORS.text.selected.disabled});
    }

    ${ToggleCardBoxIcon} {
      fill: var(${ICON_COLORS.fill.selected.disabled});
    }
  }
`;
