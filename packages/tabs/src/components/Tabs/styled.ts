import { styled } from '@linaria/react';

import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-theme';
import { DEFAULT_STYLES } from '@sbercloud/uikit-utils';

const { COLORS_TABS } = DEPRECATED_EXPORT_VARS;

export const GroupStyled = styled.ul`
  ${DEFAULT_STYLES.COMMON};
  list-style: none;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid var(${COLORS_TABS.TAB_BORDER_COLOR});

  &[data-gray] {
    border-bottom: 1px solid var(${COLORS_TABS.TAB_GRAY_BORDER_COLOR});
  }
`;
