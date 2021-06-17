import { styled } from '@linaria/react';

import { EXPORT_VARS } from '@sbercloud/uikit-theme';

const { COLORS_TABS } = EXPORT_VARS;

export const GroupStyled = styled.ul`
  margin: 0;
  display: flex;
  list-style-type: none;
  flex-direction: row;
  padding: 0;
  border-bottom: 1px solid var(${COLORS_TABS.TAB_BORDER_COLOR});

  &[data-gray] {
    border-bottom: 1px solid var(${COLORS_TABS.TAB_GRAY_BORDER_COLOR});
  }
`;
