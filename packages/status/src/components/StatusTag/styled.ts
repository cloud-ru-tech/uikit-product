import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { TableText } from '@sbercloud/uikit-typography';

import { Variant } from '../../helpers';
import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Wrapper = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 4px;

  &[data-variant='${Variant.Transparent}'] {
    background-color: var(${COLORS.TRANSPARENT_BG});
  }

  &[data-variant='${Variant.Light}'] {
    background-color: var(${COLORS.LIGHT_BG});
  }

  &[data-variant='${Variant.Dark}'] {
    background-color: var(${COLORS.DARK_BG});
  }
`;

export const Content = styled(TableText)`
  color: var(${COLORS.TEXT_COLOR});
`;

export const statusBadgeClassName = css`
  margin-right: 8px;
`;
