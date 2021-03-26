import { styled } from '@linaria/react';

import { COLORS_TOOLBAR } from 'theme/color/vars';

export const ListToolBarStyled = styled.div`
  background-color: var(${COLORS_TOOLBAR.BACKGROUND});
  width: 100%;
  border-radius: 4px;
  margin: 20px 0;
  height: 40px;
  display: flex;
  flex-direction: row;
  vertical-align: middle;
  overflow: hidden;
  flex-shrink: 0;
`;
