import { styled } from '@linaria/react';
import { VFC } from 'react';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';
import { OverlayPrivateProps, Variants } from './types';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const styledOverlay = (Overlay: VFC<OverlayPrivateProps>): VFC<OverlayPrivateProps> => styled(Overlay)`
  background-color: var(${COLORS.background});
  box-sizing: border-box;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  &[data-variant=${Variants.Fixed}] {
    position: fixed;
  }

  &[data-variant=${Variants.Absolute}] {
    position: absolute;
  }

  &[data-has-blur] {
    backdrop-filter: blur(8px);
  }
`;
