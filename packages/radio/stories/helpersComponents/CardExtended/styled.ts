import { styled } from '@linaria/react';

import { H4_SEMIBOLD_STYLES, TEXT_2_STYLES, TEXT_3_STYLES } from '@sbercloud/uikit-typography';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Title = styled.span`
  ${TEXT_2_STYLES};
  display: block;
  color: var(${COLORS.RADIO_CARD.LABEL});

  &:not(:last-child) {
    margin-right: 12px;
  }
`;

export const Label = styled.h4`
  ${H4_SEMIBOLD_STYLES};
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

export const Tag = styled.span``;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  &:hover {
    ${Title}, ${Label} {
      color: var(${COLORS.RADIO_CARD.HOVER.LABEL});
    }

    ${Description} {
      color: var(${COLORS.RADIO_CARD.HOVER.DESCRIPTION});
    }
  }

  &[data-disabled='true'] {
    ${Title}, ${Label} {
      color: var(${COLORS.RADIO_CARD.DISABLED.LABEL});
    }

    ${Description} {
      color: var(${COLORS.RADIO_CARD.DISABLED.DESCRIPTION});
    }
  }

  &[data-checked='true'] {
    ${Title}, ${Label} {
      color: var(${COLORS.RADIO_CARD_SELECTED.LABEL});
    }

    ${Description} {
      color: var(${COLORS.RADIO_CARD_SELECTED.DESCRIPTION});
    }

    &:hover {
      ${Title}, ${Label} {
        color: var(${COLORS.RADIO_CARD_SELECTED.HOVER.LABEL});
      }

      ${Description} {
        color: var(${COLORS.RADIO_CARD_SELECTED.HOVER.DESCRIPTION});
      }
    }

    &[data-disabled='true'] {
      ${Title}, ${Label} {
        color: var(${COLORS.RADIO_CARD_SELECTED.DISABLED.LABEL});
      }

      ${Description} {
        color: var(${COLORS.RADIO_CARD_SELECTED.DISABLED.DESCRIPTION});
      }
    }
  }
`;
