import { styled } from '@linaria/react';

import { PureButton } from '../../helperComponents/PureButton';
import { Variant } from './constants';
import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Button = styled(PureButton)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;

  &[data-variant='${Variant.Weak}'] {
    fill: var(${COLORS.WEAK_FILL});

    :hover {
      fill: var(${COLORS.WEAK_FILL_HOVER});
    }

    :active {
      fill: var(${COLORS.WEAK_FILL_ACTIVE});
    }

    :disabled {
      fill: var(${COLORS.WEAK_FILL_DISABLED});
    }
  }

  &[data-variant='${Variant.Strong}'] {
    fill: var(${COLORS.STRONG_FILL});

    :hover {
      fill: var(${COLORS.STRONG_FILL_HOVER});
    }

    :active {
      fill: var(${COLORS.STRONG_FILL_ACTIVE});
    }

    :disabled {
      fill: var(${COLORS.STRONG_FILL_DISABLED});
    }
  }

  &[data-variant='${Variant.Color}'] {
    fill: var(${COLORS.COLOR_FILL});

    :hover {
      fill: var(${COLORS.COLOR_FILL_HOVER});
    }

    :active {
      fill: var(${COLORS.COLOR_FILL_ACTIVE});
    }

    :disabled {
      fill: var(${COLORS.COLOR_FILL_DISABLED});
    }
  }

  &[data-variant='${Variant.Accent}'] {
    fill: var(${COLORS.ACCENT_FILL});

    :hover {
      fill: var(${COLORS.ACCENT_FILL_HOVER});
    }

    :active {
      fill: var(${COLORS.ACCENT_FILL_ACTIVE});
    }

    :disabled {
      fill: var(${COLORS.ACCENT_FILL_DISABLED});
    }
  }

  &[data-variant='${Variant.OnAccent}'] {
    fill: var(${COLORS.ON_ACCENT_FILL});

    :hover {
      fill: var(${COLORS.ON_ACCENT_FILL_HOVER});
    }

    :active {
      fill: var(${COLORS.ON_ACCENT_FILL_ACTIVE});
    }

    :disabled {
      fill: var(${COLORS.ON_ACCENT_FILL_DISABLED});
    }
  }
`;
