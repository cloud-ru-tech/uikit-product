import { styled } from '@linaria/react';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  background: var(${COLORS.BACKGROUND});
  box-sizing: border-box;
  width: 346px;
  padding: 24px;
  border-radius: 8px;
`;

export const ChipsWrapper = styled.div`
  display: flex;
  gap: 8px;
`;
