import { css } from '@linaria/core';

import { SHADOW } from '@sbercloud/uikit-product-utils';

import { Size, SizeInPx } from './constants';
import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

GREEN_THEME;
PURPLE_DARK_THEME;
PURPLE_THEME;
GREEN_DARK_THEME;

export const contentClassname = css`
  position: absolute;
  z-index: 1;
  top: 50%;
  right: auto;
  bottom: auto;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  row-gap: 24px;

  box-sizing: border-box;
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 48px);
  padding: 32px 0;

  background-color: var(${COLORS.background});
  border: solid 1px var(${COLORS.border});
  border-radius: 12px;
  outline: none;
  box-shadow: ${SHADOW.LARGE};

  &[data-size=${Size.Small}] {
    width: ${SizeInPx[Size.Small]};
  }

  &[data-size=${Size.Medium}] {
    width: ${SizeInPx[Size.Medium]};
  }

  &[data-size=${Size.Large}] {
    width: ${SizeInPx[Size.Large]};
  }
`;
