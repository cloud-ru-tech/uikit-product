import { styled } from '@linaria/react';

import { Size, Variant } from './constants';
import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const ChipWrapper = styled.label`
  cursor: pointer;
  display: inline-block;
  transition: background-color ease-out 200ms;
  user-select: none;
  color: var(${COLORS.DEFAULT_LABEL});

  &[data-disabled] {
    cursor: not-allowed;
  }

  &[data-variant='${Variant.Primary}'] {
    background-color: var(${COLORS.DEFAULT_BG});

    &:hover {
      background-color: var(${COLORS.HOVERED_BG});
    }

    &[data-disabled] {
      color: var(${COLORS.DISABLED_LABEL});
      background-color: var(${COLORS.DEFAULT_BG});
    }

    &[data-checked] {
      background-color: var(${COLORS.ACTIVE_BG});
      color: var(${COLORS.ACTIVE_LABEL});

      &:hover {
        background-color: var(${COLORS.ACTIVE_HOVERED_BG});
      }

      &[data-disabled] {
        background-color: var(${COLORS.DISABLED_BG});
        color: var(${COLORS.DISABLED_LABEL});
      }
    }
  }
  &[data-variant='${Variant.Transparent}'] {
    background-color: transparent;

    &:hover:not([data-disabled]) {
      background-color: var(${COLORS.DEFAULT_BG});
    }

    &[data-disabled] {
      color: var(${COLORS.DISABLED_LABEL});
    }

    &[data-checked] {
      background-color: var(${COLORS.DISABLED_BG});

      &:hover {
        background-color: var(${COLORS.DISABLED_LABEL});
      }

      &[data-disabled] {
        background-color: var(${COLORS.DISABLED_BG});
        color: var(${COLORS.DISABLED_LABEL});
      }
    }
  }

  &[data-size='${Size.Small}'] {
    border-radius: 16px;
    padding: 4px 12px;
    margin-bottom: 4px;
    line-height: 16px;
    font-size: 12px;
    margin-right: 8px;
  }
  &[data-size='${Size.Medium}'] {
    border-radius: 24px;
    padding: 8px 16px;
    margin-bottom: 8px;
    line-height: 20px;
    font-size: 14px;
    margin-right: 8px;
  }
  &[data-size='${Size.Large}'] {
    border-radius: 24px;
    padding: 12px 20px;
    margin-bottom: 8px;
    line-height: 20px;
    font-size: 14px;
    margin-right: 8px;
  }
  &[data-size='${Size.ExtraLarge}'] {
    border-radius: 32px;
    padding: 14px 24px;
    margin-bottom: 16px;
    line-height: 24px;
    font-size: 16px;
    margin-right: 16px;
  }

  &:last-child {
    margin-right: 0;
  }
`;

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
