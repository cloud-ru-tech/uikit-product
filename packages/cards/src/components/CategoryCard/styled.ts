import { styled } from '@linaria/react';

import { H3_SEMIBOLD_STYLES, TEXT_2_STYLES } from '@sbercloud/uikit-product-typography';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const ContainerStyled = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 128px;
  padding: 24px;
  border-radius: 8px;
  box-sizing: border-box;
  background-color: var(${COLORS.BACKGROUND});

  &:hover {
    cursor: pointer;
    background-color: var(${COLORS.HOVER_BACKGROUND});
    box-shadow: 0px 4px 20px var(${COLORS.HOVER_SHADOW});
  }

  &[data-disabled] {
    cursor: not-allowed;
    pointer-events: none;
    opacity: 0.5;
  }
`;

export const CardContent = styled.div``;

export const CardTitle = styled.h3`
  ${H3_SEMIBOLD_STYLES};
  margin-bottom: 12px;
`;

export const CardText = styled.span`
  ${TEXT_2_STYLES};
  color: var(${COLORS.TEXT});
`;

export const CardImageWrap = styled.div`
  min-height: 80px;
  min-width: 80px;
  max-height: 80px;
  max-width: 80px;
  margin-right: 24px;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  fill: var(${COLORS.IMAGE_FILL});
  background-color: var(${COLORS.IMAGE_BACKGROUND});
`;

export const CardImage = styled.img`
  width: 100%;
  height: 100%;
`;
