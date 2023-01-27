import { styled } from '@linaria/react';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Wrapper = styled.div`
  position: relative;
  background-color: var(${COLORS.background});
  border-radius: 8px;
  margin: 0 8px 8px 0;
  padding: 50px 16px;
  box-sizing: border-box;
`;
