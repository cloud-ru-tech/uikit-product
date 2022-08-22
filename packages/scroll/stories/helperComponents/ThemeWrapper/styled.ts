import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { Variants } from '../../../src/components/constants';
import { GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME, THEME_WRAPPER } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Wrapper = styled.div`
  border-radius: 8px;
  width: 300px;
  height: 300px;

  &[data-variant=${Variants.Primary}] {
    background: var(${THEME_WRAPPER.background.primary});
    color: var(${THEME_WRAPPER.text.primary});
  }

  &[data-variant=${Variants.OnDark}] {
    background: var(${THEME_WRAPPER.background.dark});
    color: var(${THEME_WRAPPER.text.dark});
  }
`;

export const flexboxWrapperClassname = css`
  display: flex;
`;

export const paddingWrapperClassname = css`
  padding: 24px;
`;
