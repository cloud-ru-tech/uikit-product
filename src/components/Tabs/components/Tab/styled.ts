import { styled } from '@linaria/react';

import { COLORS_TABS } from 'theme/color/vars';

export const ListItemStyled = styled.li`
  padding: 16px 12px;
  cursor: pointer;
  font-size: 16px;
  line-height: 24px;
  color: var(${COLORS_TABS.TAB_TEXT_COLOR});

  &[data-blue] {
    color: var(${COLORS_TABS.TAB_ACTIVE_COLOR});
    margin-bottom: -1px;
    border-bottom: 2px solid var(${COLORS_TABS.TAB_ACTIVE_COLOR});
  }
`;
