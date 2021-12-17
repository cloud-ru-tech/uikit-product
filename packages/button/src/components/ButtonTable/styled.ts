import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { TYPOGRAPHY_VARIABLES } from '@sbercloud/uikit-typography';

import { Variant } from './constants';
import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const buttonTableClassName = css`
  height: 28px;
  padding: 4px 4px 4px 8px;
  border-radius: 18px;

  ${TYPOGRAPHY_VARIABLES.TEXT_2}

  &[data-variant='${Variant.Fill}'] {
    fill: var(${COLORS.FILL_FILL});
    background-color: var(${COLORS.FILL_BG});
    color: var(${COLORS.FILL_COLOR});

    :hover {
      fill: var(${COLORS.FILL_FILL_HOVER});
      background-color: var(${COLORS.FILL_BG_HOVER});
      color: var(${COLORS.FILL_COLOR_HOVER});
    }

    :active {
      fill: var(${COLORS.FILL_FILL_ACTIVE});
      background-color: var(${COLORS.FILL_BG_ACTIVE});
      color: var(${COLORS.FILL_COLOR_ACTIVE});
    }

    &[data-loading] {
      fill: var(${COLORS.FILL_FILL_LOADING});
      background-color: var(${COLORS.FILL_BG_LOADING});
      color: var(${COLORS.FILL_COLOR_LOADING});
    }

    :not(&[data-loading]):disabled,
    :not(&[data-loading])&[disabled] {
      fill: var(${COLORS.FILL_FILL_DISABLED});
      background-color: var(${COLORS.FILL_BG_DISABLED});
      color: var(${COLORS.FILL_COLOR_DISABLED});
    }
  }

  &[data-variant='${Variant.OnAccent}'] {
    fill: var(${COLORS.ON_ACCENT_FILL});
    background-color: var(${COLORS.ON_ACCENT_BG});
    color: var(${COLORS.ON_ACCENT_COLOR});

    :hover {
      fill: var(${COLORS.ON_ACCENT_FILL_HOVER});
      background-color: var(${COLORS.ON_ACCENT_BG_HOVER});
      color: var(${COLORS.ON_ACCENT_COLOR_HOVER});
    }

    :active {
      fill: var(${COLORS.ON_ACCENT_FILL_ACTIVE});
      background-color: var(${COLORS.ON_ACCENT_BG_ACTIVE});
      color: var(${COLORS.ON_ACCENT_COLOR_ACTIVE});
    }

    &[data-loading] {
      fill: var(${COLORS.ON_ACCENT_FILL_LOADING});
      background-color: var(${COLORS.ON_ACCENT_BG_LOADING});
      color: var(${COLORS.ON_ACCENT_COLOR_LOADING});
    }

    :not(&[data-loading]):disabled,
    :not(&[data-loading])&[disabled] {
      fill: var(${COLORS.ON_ACCENT_FILL_DISABLED});
      background-color: var(${COLORS.ON_ACCENT_BG_DISABLED});
      color: var(${COLORS.ON_ACCENT_COLOR_DISABLED});
    }
  }

  &[data-variant='${Variant.Outline}'] {
    fill: var(${COLORS.OUTLINE_FILL});
    border: 1px solid var(${COLORS.OUTLINE_BORDER});
    color: var(${COLORS.OUTLINE_COLOR});

    :hover {
      fill: var(${COLORS.OUTLINE_FILL_HOVER});
      border: 1px solid var(${COLORS.OUTLINE_BORDER_HOVER});
      color: var(${COLORS.OUTLINE_COLOR_HOVER});
    }

    :active {
      fill: var(${COLORS.OUTLINE_FILL_ACTIVE});
      border: 1px solid var(${COLORS.OUTLINE_BORDER_ACTIVE});
      color: var(${COLORS.OUTLINE_COLOR_ACTIVE});
    }

    &[data-loading] {
      fill: var(${COLORS.OUTLINE_FILL_LOADING});
      /* при border: none будет "движение" кнопки, поэтому так */
      border: 1px solid transparent;
      background-color: var(${COLORS.OUTLINE_BG_LOADING});
      color: var(${COLORS.OUTLINE_COLOR_LOADING});
    }

    :not(&[data-loading]):disabled,
    :not(&[data-loading])&[disabled] {
      fill: var(${COLORS.OUTLINE_FILL_DISABLED});
      border: 1px solid var(${COLORS.OUTLINE_BORDER_DISABLED});
      color: var(${COLORS.OUTLINE_COLOR_DISABLED});
    }
  }
`;

export const IconWrapper = styled.div`
  margin-left: 8px;
`;
