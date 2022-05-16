import { styled } from '@linaria/react';

import { H5_STYLES, TEXT_3_STYLES } from '@sbercloud/uikit-product-typography';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Label = styled.h5`
  ${H5_STYLES};
  display: block;
  color: var(${COLORS.RADIO_CARD.LABEL});

  &:not(:last-child) {
    margin-bottom: 4px;
  }
`;

export const Description = styled.span`
  ${TEXT_3_STYLES};
  display: block;
  color: var(${COLORS.RADIO_CARD.DESCRIPTION});
`;

export const TextContainer = styled.div`
  &:not(:first-child) {
    margin-left: 12px;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;

  &:hover {
    ${Label} {
      color: var(${COLORS.RADIO_CARD.HOVER.LABEL});
    }

    ${Description} {
      color: var(${COLORS.RADIO_CARD.HOVER.DESCRIPTION});
    }
  }

  &[data-disabled='true'] {
    ${Label} {
      color: var(${COLORS.RADIO_CARD.DISABLED.LABEL});
    }

    ${Description} {
      color: var(${COLORS.RADIO_CARD.DISABLED.DESCRIPTION});
    }
  }

  &[data-checked='true'] {
    ${Label} {
      color: var(${COLORS.RADIO_CARD_SELECTED.LABEL});
    }

    ${Description} {
      color: var(${COLORS.RADIO_CARD_SELECTED.DESCRIPTION});
    }

    &:hover {
      ${Label} {
        color: var(${COLORS.RADIO_CARD_SELECTED.HOVER.LABEL});
      }

      ${Description} {
        color: var(${COLORS.RADIO_CARD_SELECTED.HOVER.DESCRIPTION});
      }
    }

    &[data-disabled='true'] {
      ${Label} {
        color: var(${COLORS.RADIO_CARD_SELECTED.DISABLED.LABEL});
      }

      ${Description} {
        color: var(${COLORS.RADIO_CARD_SELECTED.DISABLED.DESCRIPTION});
      }
    }
  }
`;
