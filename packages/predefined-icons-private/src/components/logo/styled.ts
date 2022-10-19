import { styled } from '@linaria/react';

import { Variant } from './constants';
import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

type WrapperProps = {
  height: number;
};

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Wrapper = styled.span<WrapperProps>`
  display: inline-flex;
  height: ${props => props.height}px;

  svg {
    height: 100%;
  }

  .${'ml-space-logo-text'} {
    fill: var(${COLORS.fill.icon.onDefault.MLSpace.text});
  }

  .${'ml-space-logo-abbr'} {
    fill: var(${COLORS.fill.icon.onDefault.MLSpace.abbr});
  }

  .${'cloud-logo-text'} {
    fill: var(${COLORS.fill.icon.onDefault.Cloud.text});
  }

  .${'cloud-logo-icon'} {
    fill: var(${COLORS.fill.icon.onDefault.Cloud.icon});
  }

  &[data-variant=${Variant.OnAccent}] {
    .${'ml-space-logo-text'} {
      fill: var(${COLORS.fill.icon.onAccent.MLSpace.text});
    }

    .${'ml-space-logo-abbr'} {
      fill: var(${COLORS.fill.icon.onAccent.MLSpace.abbr});
    }

    .${'cloud-logo-text'} {
      fill: var(${COLORS.fill.icon.onAccent.Cloud.text});
    }

    .${'cloud-logo-icon'} {
      fill: var(${COLORS.fill.icon.onAccent.Cloud.icon});
    }
  }
`;
