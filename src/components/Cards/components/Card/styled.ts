import { styled } from '@linaria/react';

import { COLORS_CARD } from 'theme/color/vars';

import cardBackground from '../../assets/card_background.png';

export const StyledContainer = styled.button<{
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

  font-family: SB Sans Interface;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
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

  &:active {
    background-color: var(${COLORS_CARD.CARD_SELECTED_BACKGROUND});
  }
`;

export const StyledCardContentWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 14px;
  z-index: 1;
`;

export const StyledAdditionalHover = styled.div<{ isVertical: boolean }>`
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

export const StyledAdditionalHoverImage = styled.div`
  filter: blur(35px);
  height: 100%;
  width: 100%;
  background-image: url(${cardBackground});
  background-size: cover;
  background-color: var(${COLORS_CARD.CARD_ADDITIONAL_HOVER_COLOR});
`;
