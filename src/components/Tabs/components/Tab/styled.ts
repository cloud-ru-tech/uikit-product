import { styled } from '@linaria/react';

import { COLORS_TABS } from 'theme/color/vars';

export const ListItemStyled = styled.li`
  padding: 16px 12px;
  cursor: pointer;
  line-height: 24px;
  color: var(${COLORS_TABS.TAB_TEXT_COLOR});

  &[data-blue] {
    color: var(${COLORS_TABS.TAB_ACTIVE_COLOR});
    box-shadow: 0 1px 0 0 var(${COLORS_TABS.TAB_ACTIVE_COLOR});
    transition: all 500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }
`;
