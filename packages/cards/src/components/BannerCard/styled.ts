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
  justify-content: space-between;
  align-items: stretch;
  min-height: 240px;
  padding: 32px;
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const CardTitle = styled(H3Semibold)`
  margin-bottom: 12px;
`;

export const CardText = styled(Text2)`
  display: block;
  margin-bottom: 24px;
  color: var(${COLORS.TEXT});
`;

export const CardImageWrap = styled.div`
  min-height: 176px;
  min-width: 176px;
  max-height: 176px;
  max-width: 176px;
  margin-left: 40px;
  border-radius: 12px;
`;

export const CardImage = styled.img`
  width: 100%;
  height: 100%;
`;
