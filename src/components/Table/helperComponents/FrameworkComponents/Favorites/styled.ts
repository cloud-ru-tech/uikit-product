import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { COLORS_TABLE } from 'theme/color/vars';

export const favClassName = css`
  fill: var(${COLORS_TABLE.TABLE_FAVOURITE_ICON_COLOR});

  transition: all 0.2s ease-in-out;
  &:hover {
    fill: var(${COLORS_TABLE.TABLE_FAVOURITE_ICON_HOVER_COLOR});
  }
`;

export const favFilledClassName = css`
  fill: var(${COLORS_TABLE.TABLE_FAVOURITE_ICON_FILLED_COLOR});
`;

export const Container = styled.div`
  display: flex;
  cursor: pointer;
`;
