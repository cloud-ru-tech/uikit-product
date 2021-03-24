import { styled } from '@linaria/react';

import { COLORS_CARD } from 'theme/color/vars';

import cardBackground from '../../assets/card_background.png';

export const ContainerStyled = styled.button<{
  selected?: boolean;
  additionalHover?: boolean;
}>`
  position: relative;
  padding: 24px;
  border-radius: 4px;
  background-color: ${({ selected }) =>
    selected
      ? `var(${COLORS_CARD.CARD_SELECTED_BACKGROUND})`
      : `var(${COLORS_CARD.CARD_BACKGROUND})`};
  cursor: pointer;
  border: none;
  width: 100%;
  outline: none;
  overflow: hidden;

  &:hover {
    background-color: ${({ selected }) =>
      selected
        ? `var(${COLORS_CARD.CARD_SELECTED_BACKGROUND})`
        : `var(${COLORS_CARD.CARD_HOVER_BACKGROUND})`};
    box-shadow: 0px 10px 12px var(${COLORS_CARD.CARD_HOVER_SHADOW});

    & > [data-additional-hover] {
      top: 0px;
      left: 0px;
    }
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

export const AdditionalHoverStyled = styled.div<{ isVertical: boolean }>`
  position: absolute;
  top: ${({ isVertical }) => (isVertical ? '-64px' : '0px')};
  left: ${({ isVertical }) => (isVertical ? '0px' : '-64px')};
  height: ${({ isVertical }) => (isVertical ? '64px' : '100%')};
  width: ${({ isVertical }) => (isVertical ? '100%' : '64px')};
  border-top-right-radius: ${({ isVertical }) => (isVertical ? '0px' : '18px')};
  border-bottom-right-radius: 18px;
  border-bottom-left-radius: ${({ isVertical }) =>
    isVertical ? '18px' : '0px'};
  z-index: 0;
  transition: all 0.2s ease;
  overflow: hidden;
`;

export const AdditionalHoverImageStyled = styled.div<{
  additionalHoverImage?: string;
}>`
  filter: blur(20px);
  height: 100%;
  width: 100%;
  background-size: cover;
  background-color: var(${COLORS_CARD.CARD_ADDITIONAL_HOVER_COLOR});
  background-image: ${({ additionalHoverImage }) =>
    additionalHoverImage
      ? `url(${additionalHoverImage})`
      : `url(${cardBackground})`};
`;
