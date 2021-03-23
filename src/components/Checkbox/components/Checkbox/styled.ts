import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { COLORS_CHECKBOX } from 'theme/color/vars';

export const CheckboxWrapStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &[data-disabled='true'] {
    cursor: not-allowed;
  }
`;

export const svgClassName = css`
  &[data-selected='false'] {
    fill: var(${COLORS_CHECKBOX.CHECKBOX_COLOR});
    color: var(${COLORS_CHECKBOX.CHECKBOX_COLOR});

    :hover {
      fill: var(${COLORS_CHECKBOX.CHECKBOX_HOVER_COLOR});
      color: var(${COLORS_CHECKBOX.CHECKBOX_HOVER_COLOR});
    }

    &[data-disabled='true'] {
      fill: var(${COLORS_CHECKBOX.CHECKBOX_DISABLED_COLOR});
      color: var(${COLORS_CHECKBOX.CHECKBOX_DISABLED_COLOR});
    }
  }

  &[data-selected='true'] {
    fill: var(${COLORS_CHECKBOX.CHECKBOX_FILLED_COLOR});
    color: var(${COLORS_CHECKBOX.CHECKBOX_FILLED_COLOR});

    &:hover {
      fill: var(${COLORS_CHECKBOX.CHECKBOX_FILLED_HOVER_COLOR});
      color: var(${COLORS_CHECKBOX.CHECKBOX_FILLED_HOVER_COLOR});

      & > path {
        fill: var(${COLORS_CHECKBOX.CHECKBOX_FILLED_HOVER_COLOR});
        color: var(${COLORS_CHECKBOX.CHECKBOX_FILLED_HOVER_COLOR});
      }
    }

    &[data-disabled='true'] {
      fill: var(${COLORS_CHECKBOX.CHECKBOX_FILLED_DISABLED_COLOR});
      color: var(${COLORS_CHECKBOX.CHECKBOX_FILLED_DISABLED_COLOR});

      & > path {
        fill: var(${COLORS_CHECKBOX.CHECKBOX_FILLED_DISABLED_COLOR});
        color: var(${COLORS_CHECKBOX.CHECKBOX_FILLED_DISABLED_COLOR});
      }
    }
  }
`;
