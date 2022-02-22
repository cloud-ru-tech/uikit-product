import { styled } from '@linaria/react';

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
  fill: var(${COLORS.UNCHECKED.DEFAULT_FILL});
  transition: fill 0.2s ease-in-out;

  &:hover {
    fill: var(${COLORS.UNCHECKED.HOVER_FILL});
  }

  &[data-disabled] {
    fill: var(${COLORS.UNCHECKED.DISABLED_FILL});
  }

  &[data-checked] {
    fill: var(${COLORS.CHECKED.DEFAULT_FILL});

    &:hover {
      fill: var(${COLORS.CHECKED.HOVER_FILL});
    }

    &[data-disabled] {
      fill: var(${COLORS.CHECKED.DISABLED_FILL});
    }
  }
`;
