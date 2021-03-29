import { styled } from '@linaria/react';

import { COLORS_TABS } from 'theme/color/vars';

export const GroupStyled = styled.ul`
  margin: 0 0 24px 0;
  display: flex;
  list-style-type: none;
  flex-direction: row;
  padding: 0px;
  border-bottom: 1px solid var(${COLORS_TABS.TAB_BORDER_COLOR});

  &[data-gray] {
    border-bottom: 1px solid var(${COLORS_TABS.TAB_GRAY_BORDER_COLOR});
  }
`;
