import { styled } from '@linaria/react';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Wrapper = styled.header`
  background-color: var(${COLORS.background.default});
  display: grid;
  grid-template-columns: [header-menu] auto [header-logo] auto [header-project-selector] auto [header-balance-tooltip] auto [header-project-description] auto [header-toolbar] 1fr;
  padding: 8px 16px;
  border-bottom: 1px solid var(${COLORS.border.default});
`;
