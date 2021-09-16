import { styled } from '@linaria/react';

import { Variants } from './constants';
import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const HiddenCheckbox = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  border-style: none;
  z-index: -1;
  opacity: 0;
  margin: 0;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  cursor: pointer;
  margin: 2px;
  height: 20px;
  min-height: 20px;
  width: 20px;
  min-width: 20px;
  background: transparent;

  &[data-variant='${Variants.Weak}'] {
    fill: var(${COLORS.WEAK.INACTIVE});

    &:hover {
      fill: var(${COLORS.WEAK.HOVER});
    }

    &[data-checked] {
      fill: var(${COLORS.WEAK.ACTIVE});

      &:hover {
        fill: var(${COLORS.WEAK.HOVER});
      }
    }

    &[data-disabled] {
      fill: var(${COLORS.WEAK.DISABLED});

      &:hover {
        fill: var(${COLORS.WEAK.DISABLED});
      }
    }
  }

  &[data-variant='${Variants.Strong}'] {
    fill: var(${COLORS.STRONG.INACTIVE});

    &:hover {
      fill: var(${COLORS.STRONG.HOVER});
    }

    &[data-checked] {
      fill: var(${COLORS.STRONG.ACTIVE});

      &:hover {
        fill: var(${COLORS.STRONG.HOVER});
      }
    }

    &[data-disabled] {
      fill: var(${COLORS.STRONG.DISABLED});

      &:hover {
        fill: var(${COLORS.STRONG.DISABLED});
      }
    }
  }

  &[data-variant='${Variants.OnAccent}'] {
    fill: var(${COLORS.ON_ACCENT.INACTIVE});

    &:hover {
      fill: var(${COLORS.ON_ACCENT.HOVER});
    }

    &[data-checked] {
      fill: var(${COLORS.ON_ACCENT.ACTIVE});

      &:hover {
        fill: var(${COLORS.ON_ACCENT.HOVER});
      }
    }

    &[data-disabled] {
      fill: var(${COLORS.ON_ACCENT.DISABLED});

      &:hover {
        fill: var(${COLORS.ON_ACCENT.DISABLED});
      }
    }
  }
`;
