import { styled } from '@linaria/react';

import { ANIMATIONS } from '@sbercloud/uikit-product-utils';

import { Icon } from '../../constants';
import { Variants } from './constants';
import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Wrapper = styled.span`
  display: inline-flex;

  &[data-variant=${Variants.Primary}] {
    &[data-icon=${Icon.Info}] {
      fill: var(${COLORS.fill.primary.info});
    }

    &[data-icon=${Icon.Success}] {
      fill: var(${COLORS.fill.primary.success});
    }

    &[data-icon=${Icon.AttentionCritical}] {
      fill: var(${COLORS.fill.primary.attentionCritical});
    }

    &[data-icon=${Icon.AttentionWarning}] {
      fill: var(${COLORS.fill.primary.attentionWarning});
    }

    &[data-icon=${Icon.Failed}] {
      fill: var(${COLORS.fill.primary.failed});
    }

    &[data-icon=${Icon.Cancel}] {
      fill: var(${COLORS.fill.primary.cancel});
    }

    &[data-icon=${Icon.Loading}] {
      fill: var(${COLORS.fill.primary.loading});
    }
  }

  &[data-variant=${Variants.OnDark}] {
    &[data-icon=${Icon.Info}] {
      fill: var(${COLORS.fill.onDark.info});
    }

    &[data-icon=${Icon.Success}] {
      fill: var(${COLORS.fill.onDark.success});
    }

    &[data-icon=${Icon.AttentionCritical}] {
      fill: var(${COLORS.fill.onDark.attentionCritical});
    }

    &[data-icon=${Icon.AttentionWarning}] {
      fill: var(${COLORS.fill.onDark.attentionWarning});
    }

    &[data-icon=${Icon.Failed}] {
      fill: var(${COLORS.fill.onDark.failed});
    }

    &[data-icon=${Icon.Cancel}] {
      fill: var(${COLORS.fill.onDark.cancel});
    }

    &[data-icon=${Icon.Loading}] {
      fill: var(${COLORS.fill.onDark.loading});
    }
  }

  &[data-variant=${Variants.OnAccent}] {
    &[data-icon=${Icon.Info}] {
      fill: var(${COLORS.fill.onAccent.info});
    }

    &[data-icon=${Icon.Success}] {
      fill: var(${COLORS.fill.onAccent.success});
    }

    &[data-icon=${Icon.AttentionCritical}] {
      fill: var(${COLORS.fill.onAccent.attentionCritical});
    }

    &[data-icon=${Icon.AttentionWarning}] {
      fill: var(${COLORS.fill.onAccent.attentionWarning});
    }

    &[data-icon=${Icon.Failed}] {
      fill: var(${COLORS.fill.onAccent.failed});
    }

    &[data-icon=${Icon.Cancel}] {
      fill: var(${COLORS.fill.onAccent.cancel});
    }

    &[data-icon=${Icon.Loading}] {
      fill: var(${COLORS.fill.onAccent.loading});
    }
  }

  &[data-icon=${Icon.Loading}] > svg {
    ${ANIMATIONS.LOADING_WHEEL};
  }
`;
