import { styled } from '@linaria/react';

import { H3Semibold, Text2 } from '@sbercloud/uikit-typography';

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
`;

export const CardContent = styled.div`
  max-width: 250px;
`;

export const CardTitle = styled(H3Semibold)`
  margin-bottom: 12px;
`;

export const CardText = styled(Text2)`
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
