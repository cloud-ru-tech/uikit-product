import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { COLORS_GENERAL, COLORS_RADIO } from 'theme/color/vars';

export const HiddenRadio = styled.input`
  opacity: 0;
  display: none;
`;

export const TextContainer = styled.div`
  padding-left: 8px;
`;

// TODO: check hover styles
export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 14px;
  height: 14px;

  stroke: var(${COLORS_RADIO.COLOR});

  &:hover {
    stroke: var(${COLORS_RADIO.HOVER_COLOR});
  }

  &[data-checked='true'] {
    stroke: var(${COLORS_RADIO.CHECKED_COLOR});
    fill: var(${COLORS_RADIO.CHECKED_COLOR});

    &:hover {
      fill: var(${COLORS_RADIO.CHECKED_HOVER_COLOR});
      stroke: var(${COLORS_RADIO.CHECKED_HOVER_COLOR});
    }
  }

  &[data-disabled='true'] {
    stroke: var(${COLORS_RADIO.DISABLED_COLOR});
    fill: var(${COLORS_RADIO.DISABLED_COLOR});

    &:hover {
      stroke: var(${COLORS_RADIO.DISABLED_COLOR});
      fill: var(${COLORS_RADIO.DISABLED_COLOR});
    }
  }
`;

export const CheckboxContainer = styled.label`
  display: inline-flex;
  padding: 8px;
`;

export const Label = styled.div`
  font-family: SB Sans Interface;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 1;
  color: var(${COLORS_GENERAL.TEXT});
`;

export const Description = styled.div`
  font-family: SB Sans Interface;
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 15px;
  color: var(${COLORS_GENERAL.TEXT});
`;
// TODO: we have to create className instead of wrapping component because of a bug
// https://github.com/NervJS/taro/issues/8325
export const radioCheckedClassName = css`
  position: absolute;
  animation-name: checked;
  animation-duration: 0.5s;
`;
