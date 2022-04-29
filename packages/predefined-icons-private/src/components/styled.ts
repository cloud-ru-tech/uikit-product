import { styled } from '@linaria/react';

import { ANIMATIONS } from '@sbercloud/uikit-utils';

import { Icons, Variants } from './constants';
import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Wrapper = styled.span`
  display: inline-flex;

  &[data-variant=${Variants.Primary}] {
    &[data-icon=${Icons.Success}] {
      fill: var(${COLORS.fill.primary.success});
    }

    &[data-icon=${Icons.Failed}] {
      fill: var(${COLORS.fill.primary.failed});
    }

    &[data-icon=${Icons.Cancel}] {
      fill: var(${COLORS.fill.primary.cancel});
    }

    &[data-icon=${Icons.Loading}] {
      fill: var(${COLORS.fill.primary.loading});
    }
  }

  &[data-variant=${Variants.OnDark}] {
    &[data-icon=${Icons.Success}] {
      fill: var(${COLORS.fill.onDark.success});
    }

    &[data-icon=${Icons.Failed}] {
      fill: var(${COLORS.fill.onDark.failed});
    }

    &[data-icon=${Icons.Cancel}] {
      fill: var(${COLORS.fill.onDark.cancel});
    }

    &[data-icon=${Icons.Loading}] {
      fill: var(${COLORS.fill.onDark.loading});
    }
  }

  &[data-icon=${Icons.Loading}] > svg {
    ${ANIMATIONS.LOADING_WHEEL};
  }
`;
