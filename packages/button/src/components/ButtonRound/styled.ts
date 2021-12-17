import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { TYPOGRAPHY_VARIABLES } from '@sbercloud/uikit-typography';

import { Variant } from './constants';
import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const buttonRoundClassName = css`
  height: 28px;
  border-radius: 18px;

  ${TYPOGRAPHY_VARIABLES.TEXT_2}

  &[data-variant='${Variant.Filled}'] {
    fill: var(${COLORS.FILLED_FILL});
    background-color: var(${COLORS.FILLED_BG});
    color: var(${COLORS.FILLED_COLOR});

    :hover {
      fill: var(${COLORS.FILLED_FILL_HOVER});
      background-color: var(${COLORS.FILLED_BG_HOVER});
      color: var(${COLORS.FILLED_COLOR_HOVER});
    }

    :active {
      fill: var(${COLORS.FILLED_FILL_ACTIVE});
      background-color: var(${COLORS.FILLED_BG_ACTIVE});
      color: var(${COLORS.FILLED_COLOR_ACTIVE});
    }

    :disabled,
    &[disabled] {
      fill: var(${COLORS.FILLED_FILL_DISABLED});
      background-color: var(${COLORS.FILLED_BG_DISABLED});
      color: var(${COLORS.FILLED_COLOR_DISABLED});
    }
  }

  &[data-variant='${Variant.OutlineAccent}'] {
    fill: var(${COLORS.OUTLINE_ACCENT_FILL});
    border: 1px solid var(${COLORS.OUTLINE_ACCENT_BORDER});
    color: var(${COLORS.OUTLINE_ACCENT_COLOR});

    :hover {
      fill: var(${COLORS.OUTLINE_ACCENT_FILL_HOVER});
      border-color: var(${COLORS.OUTLINE_ACCENT_BORDER_HOVER});
      color: var(${COLORS.OUTLINE_ACCENT_COLOR_HOVER});
    }

    :active {
      fill: var(${COLORS.OUTLINE_ACCENT_FILL_ACTIVE});
      border-color: var(${COLORS.OUTLINE_ACCENT_BORDER_ACTIVE});
      color: var(${COLORS.OUTLINE_ACCENT_COLOR_ACTIVE});
    }

    :disabled,
    &[disabled] {
      fill: var(${COLORS.OUTLINE_ACCENT_FILL_DISABLED});
      border-color: var(${COLORS.OUTLINE_ACCENT_BORDER_DISABLED});
      color: var(${COLORS.OUTLINE_ACCENT_COLOR_DISABLED});
    }
  }

  &[data-variant='${Variant.OutlineGrey}'] {
    fill: var(${COLORS.OUTLINE_GREY_FILL});
    border: 1px solid var(${COLORS.OUTLINE_GREY_BORDER});
    color: var(${COLORS.OUTLINE_GREY_COLOR});

    :hover {
      fill: var(${COLORS.OUTLINE_GREY_FILL_HOVER});
      border-color: var(${COLORS.OUTLINE_GREY_BORDER_HOVER});
      color: var(${COLORS.OUTLINE_GREY_COLOR_HOVER});
    }

    :active {
      fill: var(${COLORS.OUTLINE_GREY_FILL_ACTIVE});
      border-color: var(${COLORS.OUTLINE_GREY_BORDER_ACTIVE});
      color: var(${COLORS.OUTLINE_GREY_COLOR_ACTIVE});
    }

    :disabled,
    &[disabled] {
      fill: var(${COLORS.OUTLINE_GREY_FILL_DISABLED});
      background-color: var(${COLORS.OUTLINE_GREY_BG_DISABLED});
      border-color: var(${COLORS.OUTLINE_GREY_BORDER_DISABLED});
      color: var(${COLORS.OUTLINE_GREY_COLOR_DISABLED});
    }
  }

  &[data-variant='${Variant.Transparent}'] {
    fill: var(${COLORS.TRANSPARENT_FILL});
    color: var(${COLORS.TRANSPARENT_COLOR});

    :hover {
      fill: var(${COLORS.TRANSPARENT_FILL_HOVER});
      background-color: var(${COLORS.TRANSPARENT_BG_HOVER});
      color: var(${COLORS.TRANSPARENT_COLOR_HOVER});
    }

    :active {
      fill: var(${COLORS.TRANSPARENT_FILL_ACTIVE});
      background-color: var(${COLORS.TRANSPARENT_BG_ACTIVE});
      color: var(${COLORS.TRANSPARENT_COLOR_ACTIVE});
    }

    :disabled,
    &[disabled] {
      fill: var(${COLORS.TRANSPARENT_FILL_DISABLED});
      color: var(${COLORS.TRANSPARENT_COLOR_DISABLED});
    }
  }
`;

export const TextWrapper = styled.div`
  margin: 4px 8px;

  &[data-with-icon] {
    margin-right: 4px;
  }
`;

export const IconWrapper = styled.div`
  margin: 4px;

  &[data-variant='${Variant.OutlineAccent}'],
  &[data-variant='${Variant.OutlineGrey}'] {
    margin: 3px;
  }
`;
