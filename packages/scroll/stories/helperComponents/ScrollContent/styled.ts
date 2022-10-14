import { styled } from '@linaria/react';

import { Variants } from '../../../src/components/constants';
import { GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME, SCROLL_CONTENT } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const ScrollContent = styled.div`
  display: inline-block;

  &[data-variant=${Variants.Primary}] {
    background: var(${SCROLL_CONTENT.background.primary});
    color: var(${SCROLL_CONTENT.text.primary});
  }

  &[data-variant=${Variants.OnDark}] {
    background: var(${SCROLL_CONTENT.background.dark});
    color: var(${SCROLL_CONTENT.text.dark});
  }
`;

export const OverflownContent = styled.p`
  width: 600px;
`;
