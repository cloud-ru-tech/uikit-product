import { styled } from '@linaria/react';

import { H4_STYLES } from '@sbercloud/uikit-typography';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Label = styled.h4`
  ${H4_STYLES};
  display: inline-block;
  color: var(${COLORS.RADIO_CARD.LABEL});

  &:not(:first-child) {
    margin-left: 16px;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px;

  &:hover {
    ${Label} {
      color: var(${COLORS.RADIO_CARD.HOVER.LABEL});
    }
  }

  &[data-disabled='true'] {
    ${Label} {
      color: var(${COLORS.RADIO_CARD.DISABLED.LABEL});
    }
  }

  &[data-checked='true'] {
    ${Label} {
      color: var(${COLORS.RADIO_CARD_SELECTED.LABEL});
    }

    &:hover {
      ${Label} {
        color: var(${COLORS.RADIO_CARD_SELECTED.HOVER.LABEL});
      }
    }

    &[data-disabled='true'] {
      ${Label} {
        color: var(${COLORS.RADIO_CARD_SELECTED.DISABLED.LABEL});
      }
    }
  }
`;
