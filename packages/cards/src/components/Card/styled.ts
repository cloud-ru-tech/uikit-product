import { styled } from '@linaria/react';

import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-product-theme';

import { CardVariant } from './constants';

const { COLORS_CARD } = DEPRECATED_EXPORT_VARS;

export const ContainerStyled = styled.div<{
  selected?: boolean;
}>`
  position: relative;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 4px;
  background-color: ${({ selected }) =>
    selected ? `var(${COLORS_CARD.CARD_SELECTED_BACKGROUND})` : `var(${COLORS_CARD.CARD_BACKGROUND})`};
  cursor: pointer;
  width: 100%;
  overflow: hidden;

  &:hover {
    background-color: ${({ selected }) =>
      selected ? `var(${COLORS_CARD.CARD_SELECTED_BACKGROUND})` : `var(${COLORS_CARD.CARD_HOVER_BACKGROUND})`};
    box-shadow: 0 10px 12px var(${COLORS_CARD.CARD_HOVER_SHADOW});
  }

  &[data-variant='${CardVariant.Default}'] {
    padding: 20px;
  }

  &[data-variant='${CardVariant.Product}'] {
    padding: 24px;
  }
`;

export const CardContentWrapStyled = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 14px;
  z-index: 1;
`;
