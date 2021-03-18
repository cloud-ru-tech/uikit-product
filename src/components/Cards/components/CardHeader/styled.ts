import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { COLORS_CARD } from 'theme/color/vars';

export const StyledButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

export const StyledFavouriteWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const favouriteButtonClassName = css`
  cursor: pointer;
  fill: ${COLORS_CARD.CARD_FAVOURITE_ICON_COLOR};

  transition: all 0.2s ease-in-out;
  &:hover {
    fill: ${COLORS_CARD.CARD_FAVOURITE_ICON_HOVER_COLOR};
  }
  &[data-filled='true'] {
    fill: ${COLORS_CARD.CARD_FAVOURITE_ICON_FILLED_COLOR};
  }
`;

export const moreButtonClassName = css`
  & > span {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  margin: -12px -16px;
`;
