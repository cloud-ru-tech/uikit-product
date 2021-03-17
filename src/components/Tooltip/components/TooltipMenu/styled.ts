import { styled } from '@linaria/react';

import { COLORS_TOOLTIP } from 'theme/color/vars';

export const Container = styled.nav`
  background-color: var(${COLORS_TOOLTIP.MENU_BG});
  border-radius: 4px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
`;

export const ContainerItem = styled.ul`
  padding: 4px 0;
  margin: 0;
`;
