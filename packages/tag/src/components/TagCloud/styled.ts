import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { EXPORT_VARS } from '@sbercloud/uikit-theme';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const tooltipContainerClassName = css`
  background-color: var(${COLORS.background.default});
  border-radius: 4px;
  box-shadow: 0 4px 20px var(${EXPORT_VARS.BLACK_ALFA[8]});
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  gap: 8px 4px;
  max-height: 256px;
  max-width: 200px;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 12px;
`;

export const Item = styled.div`
  min-width: 0;
`;
