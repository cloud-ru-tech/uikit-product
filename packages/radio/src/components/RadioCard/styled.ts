import { styled } from '@linaria/react';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const HiddenRadio = styled.input`
  display: none;
`;

export const Wrapper = styled.label`
  display: flex;
  align-items: flex-start;
  padding: 12px;
  border-radius: 4px;
  background-color: var(${COLORS.RADIO_CARD.BG});
  border: 1px solid var(${COLORS.RADIO_CARD.BORDER});
  box-sizing: border-box;

  svg {
    fill: var(${COLORS.RADIO_CARD.ICON});
  }

  &:hover {
    cursor: pointer;
    background-color: var(${COLORS.RADIO_CARD.HOVER.BG});
    border: 1px solid var(${COLORS.RADIO_CARD.HOVER.BORDER});

    svg {
      fill: var(${COLORS.RADIO_CARD.HOVER.ICON});
    }
  }

  &[data-disabled='true'] {
    cursor: not-allowed;
    background-color: var(${COLORS.RADIO_CARD.DISABLED.BG});
    border: 1px solid var(${COLORS.RADIO_CARD.DISABLED.BORDER});

    svg {
      fill: var(${COLORS.RADIO_CARD.DISABLED.ICON});
    }
  }

  &[data-checked='true'] {
    background-color: var(${COLORS.RADIO_CARD_SELECTED.BG});
    border: 1px solid var(${COLORS.RADIO_CARD_SELECTED.BORDER});

    svg {
      fill: var(${COLORS.RADIO_CARD_SELECTED.ICON});
    }

    &:hover {
      background-color: var(${COLORS.RADIO_CARD_SELECTED.HOVER.BG});
      border: 1px solid var(${COLORS.RADIO_CARD_SELECTED.HOVER.BORDER});

      svg {
        fill: var(${COLORS.RADIO_CARD_SELECTED.HOVER.ICON});
      }
    }

    &[data-disabled='true'] {
      background-color: var(${COLORS.RADIO_CARD_SELECTED.DISABLED.BG});
      border: 1px solid var(${COLORS.RADIO_CARD_SELECTED.DISABLED.BORDER});

      svg {
        fill: var(${COLORS.RADIO_CARD_SELECTED.DISABLED.ICON});
      }
    }
  }
`;
