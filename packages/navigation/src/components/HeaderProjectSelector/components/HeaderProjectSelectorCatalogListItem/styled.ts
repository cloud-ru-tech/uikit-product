import { styled } from '@linaria/react';

import { TEXT_3_STYLES } from '@sbercloud/uikit-product-typography';

import { HeaderProjectSelectorDivider } from '../HeaderProjectSelectorDivider';
import { HeaderProjectSelectorListItem } from '../HeaderProjectSelectorListItem';
import { GREEN_DARK_THEME, GREEN_THEME, LABEL_COLORS, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Divider = styled(HeaderProjectSelectorDivider)``;

export const Wrapper = styled(HeaderProjectSelectorListItem)`
  &:first-child > ${Divider} {
    display: none;
  }
`;

export const Label = styled.div`
  ${TEXT_3_STYLES};

  color: var(${LABEL_COLORS.text.default});
  padding: 8px 16px 4px;
`;
