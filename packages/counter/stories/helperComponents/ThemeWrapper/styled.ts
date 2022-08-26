import { styled } from '@linaria/react';

import { Variant } from '../../../src/components/constants';
import { GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME, THEME_WRAPPER } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Wrapper = styled.div`
  display: inline-block;
  border-radius: 8px;
  padding: 24px;

  &[data-variant=${Variant.Primary}] {
    background: var(${THEME_WRAPPER.background.primary});
    color: var(${THEME_WRAPPER.text.primary});
  }

  &[data-variant=${Variant.OnDark}] {
    background: var(${THEME_WRAPPER.background.dark});
    color: var(${THEME_WRAPPER.text.dark});
  }
`;
