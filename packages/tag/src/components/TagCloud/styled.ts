import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { EXPORT_VARS } from '@sbercloud/uikit-product-theme';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const TRANSITION_DURATION = 200;

export const tooltipContainerClassName = css`
  border-radius: 4px;
`;

export const Content = styled.div`
  background-color: var(${COLORS.background.default});
  border-radius: inherit;
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
  transition: opacity ${TRANSITION_DURATION}ms ease-out;

  &[data-state='entered'] {
    opacity: 1;
  }

  &[data-state='entering'],
  &[data-state='exiting'],
  &[data-state='exited'] {
    opacity: 0;
  }
`;

export const Item = styled.div`
  min-width: 0;
`;
