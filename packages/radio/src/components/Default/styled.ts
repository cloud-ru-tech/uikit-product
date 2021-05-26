import { styled } from '@linaria/react';

import { EXPORT_VARS } from '@sbercloud/uikit-theme';
import { TableText, Text4 } from '@sbercloud/uikit-typography';

const { COLORS_RADIO } = EXPORT_VARS;

export const HiddenRadio = styled.input`
  display: none;
`;

export const IconContainer = styled.div`
  display: flex;

  stroke: var(${COLORS_RADIO.ICON_COLOR});
  fill: var(${COLORS_RADIO.ICON_BG});

  &:not([data-disabled='true']) {
    &:hover {
      stroke: var(${COLORS_RADIO.ICON_HOVER_COLOR});
    }
  }

  &[data-disabled='true'] {
    stroke: var(${COLORS_RADIO.ICON_DISABLED_COLOR});
    fill: none;
  }

  &[data-checked='true'] {
    stroke: var(${COLORS_RADIO.CHECKED_ICON_COLOR});

    &:hover {
      stroke: var(${COLORS_RADIO.CHECKED_ICON_HOVER_COLOR});
    }

    &[data-disabled='true'] {
      stroke: var(${COLORS_RADIO.CHECKED_ICON_DISABLED_COLOR});
    }
  }
`;

export const Label = styled(TableText)`
  display: block;
  color: var(${COLORS_RADIO.COLOR});
`;

export const Description = styled(Text4)`
  display: block;
  color: var(${COLORS_RADIO.SECONDARY_COLOR});
`;

export const TextContainer = styled.div`
  padding-left: 8px;
`;

export const Wrapper = styled.label`
  display: flex;
  align-items: flex-start;
  padding: 8px 12px;

  &:hover {
    cursor: pointer;
  }

  &[data-checked='true'] {
    background-color: var(${COLORS_RADIO.CHECKED_BG});
  }

  &:not([data-disabled='true']):hover {
    background-color: var(${COLORS_RADIO.HOVER_BG});
  }

  &[data-disabled='true'] {
    cursor: not-allowed;

    ${Label},
    ${Description} {
      color: var(${COLORS_RADIO.DISABLED_COLOR});
    }
  }
`;
