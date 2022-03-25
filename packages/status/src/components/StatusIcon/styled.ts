import { styled } from '@linaria/react';

import { ANIMATIONS } from '@sbercloud/uikit-utils';

import { Types, Variants } from './constants';
import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Wrapper = styled.span`
  display: inline-flex;

  &[data-variant=${Variants.Primary}] {
    &[data-type=${Types.Success}] {
      fill: var(${COLORS.fill.onDefault.success});
    }

    &[data-type=${Types.Failed}] {
      fill: var(${COLORS.fill.onDefault.failed});
    }

    &[data-type=${Types.Cancel}] {
      fill: var(${COLORS.fill.onDefault.cancel});
    }

    &[data-type=${Types.Loading}] {
      fill: var(${COLORS.fill.onDefault.loading});
    }
  }

  &[data-variant=${Variants.OnDark}] {
    &[data-type=${Types.Success}] {
      fill: var(${COLORS.fill.onDark.success});
    }

    &[data-type=${Types.Failed}] {
      fill: var(${COLORS.fill.onDark.failed});
    }

    &[data-type=${Types.Cancel}] {
      fill: var(${COLORS.fill.onDark.cancel});
    }

    &[data-type=${Types.Loading}] {
      fill: var(${COLORS.fill.onDark.loading});
    }
  }

  &[data-type=${Types.Loading}] > svg {
    ${ANIMATIONS.LOADING_WHEEL};
  }
`;
