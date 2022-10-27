import { styled } from '@linaria/react';

import { TEXT_2_STYLES } from '@sbercloud/uikit-product-typography';

import { IconContainer } from '../RadioIconPrivate/styled';
import { COLORS } from '../RadioIconPrivate/themes';

export const HiddenRadio = styled.input`
  display: none;
`;

export const Label = styled.span`
  ${TEXT_2_STYLES};
  display: inline-block;
  padding-left: 8px;
  color: var(${COLORS.RADIO.LABEL});
`;

export const Wrapper = styled.label`
  display: flex;
  align-items: center;

  &:hover {
    cursor: pointer;

    ${Label} {
      color: var(${COLORS.RADIO.HOVER.LABEL});
    }
    ${IconContainer} {
      fill: var(${COLORS.RADIO.HOVER.ICON});
    }
  }

  &[data-disabled='true'] {
    cursor: not-allowed;

    ${Label} {
      color: var(${COLORS.RADIO.DISABLED.LABEL});
    }
    ${IconContainer} {
      fill: var(${COLORS.RADIO.DISABLED.ICON});
    }
  }

  &[data-checked='true'] {
    ${Label} {
      color: var(${COLORS.RADIO_SELECTED.LABEL});
    }
    ${IconContainer} {
      fill: var(${COLORS.RADIO_SELECTED.ICON});
    }

    &:hover {
      ${Label} {
        color: var(${COLORS.RADIO_SELECTED.HOVER.LABEL});
      }
      ${IconContainer} {
        fill: var(${COLORS.RADIO_SELECTED.HOVER.ICON});
      }
    }

    &[data-disabled='true'] {
      ${Label} {
        color: var(${COLORS.RADIO_SELECTED.DISABLED.LABEL});
      }
      ${IconContainer} {
        fill: var(${COLORS.RADIO_SELECTED.DISABLED.ICON});
      }
    }
  }
`;
