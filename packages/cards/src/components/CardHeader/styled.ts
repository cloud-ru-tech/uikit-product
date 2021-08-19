import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-theme';

const { COLORS_CARD } = DEPRECATED_EXPORT_VARS;

export const ButtonGroupStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

export const FavouriteWrapStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const HeaderStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 20px;
  justify-content: space-between;
`;

export const favouriteButtonClassName = css`
  cursor: pointer;
  fill: var(${COLORS_CARD.CARD_FAVOURITE_ICON_COLOR});

  transition: all 0.2s ease-in-out;
  &:hover {
    fill: var(${COLORS_CARD.CARD_FAVOURITE_ICON_HOVER_COLOR});
  }
  &[data-filled='true'] {
    fill: var(${COLORS_CARD.CARD_FAVOURITE_ICON_FILLED_COLOR});
  }
`;
