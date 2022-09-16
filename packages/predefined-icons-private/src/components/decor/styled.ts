import { styled } from '@linaria/react';

import { ANIMATIONS } from '@sbercloud/uikit-product-utils';

import { Icon } from '../../constants';
import { PredefinedDecorIconType, Sizes, SIZES_IN_PX } from './constants';
import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Wrapper = styled.span`
  display: inline-flex;
  border-radius: 50%;

  &[data-size=${Sizes.Small}] {
    padding: ${SIZES_IN_PX[Sizes.Small].padding};
  }

  &[data-size=${Sizes.Medium}] {
    padding: ${SIZES_IN_PX[Sizes.Medium].padding};
  }

  &[data-size=${Sizes.Large}] {
    padding: ${SIZES_IN_PX[Sizes.Large].padding};
  }

  &[data-type=${PredefinedDecorIconType.Custom}] {
    fill: var(${COLORS.custom.fill});
    background-color: var(${COLORS.custom.background});
  }

  &[data-type=${PredefinedDecorIconType.Predefined}] {
    &[data-icon=${Icon.Info}] {
      background: var(${COLORS.predefined.background.info});
      fill: var(${COLORS.predefined.fill.info});
    }

    &[data-icon=${Icon.Success}] {
      background: var(${COLORS.predefined.background.success});
      fill: var(${COLORS.predefined.fill.success});
    }

    &[data-icon=${Icon.AttentionCritical}] {
      background: var(${COLORS.predefined.background.attentionCritical});
      fill: var(${COLORS.predefined.fill.attentionCritical});
    }

    &[data-icon=${Icon.AttentionWarning}] {
      background: var(${COLORS.predefined.background.attentionWarning});
      fill: var(${COLORS.predefined.fill.attentionWarning});
    }

    &[data-icon=${Icon.Failed}] {
      background: var(${COLORS.predefined.background.failed});
      fill: var(${COLORS.predefined.fill.failed});
    }

    &[data-icon=${Icon.Cancel}] {
      background: var(${COLORS.predefined.background.cancel});
      fill: var(${COLORS.predefined.fill.cancel});
    }

    &[data-icon=${Icon.Loading}] {
      background: var(${COLORS.predefined.background.loading});
      fill: var(${COLORS.predefined.fill.loading});
    }

    &[data-icon=${Icon.Loading}] > svg {
      ${ANIMATIONS.LOADING_WHEEL};
    }
  }
`;
