import { styled } from '@linaria/react';

import { TEXT_3_STYLES } from '@sbercloud/uikit-product-typography';

import { Divider as DividerInner } from '../Divider';
import { ListItem } from '../ListItem';
import { GREEN_DARK_THEME, GREEN_THEME, LABEL_COLORS, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Divider = styled(DividerInner)``;

export const Wrapper = styled(ListItem)`
  &:first-child > ${Divider} {
    display: none;
  }
`;

export const Label = styled.div`
  ${TEXT_3_STYLES};

  padding: 8px 16px 4px;

  color: var(${LABEL_COLORS.text.default});
`;
