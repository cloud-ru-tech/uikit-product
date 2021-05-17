import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { COLORS_CHECKBOX } from 'theme/color/vars';

export const CheckboxStyled = styled.input`
  position: absolute;
  width: 0px;
  height: 0px;
  padding: 0px;
  border-style: none;
`;

export const CheckboxLabelStyled = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &[data-disabled] {
    color: var(${COLORS_CHECKBOX.CHECKBOX_DISABLED_COLOR});
    cursor: not-allowed;
  }
`;

export const CheckboxChildrenStyled = styled.div`
  margin-left: 4px;
`;

export const svgClassName = css`
  fill: var(${COLORS_CHECKBOX.CHECKBOX_COLOR});
  color: var(${COLORS_CHECKBOX.CHECKBOX_COLOR});

  :hover {
    fill: var(${COLORS_CHECKBOX.CHECKBOX_HOVER_COLOR});
    color: var(${COLORS_CHECKBOX.CHECKBOX_HOVER_COLOR});
  }

  & rect {
    fill: var(${COLORS_CHECKBOX.CHECKBOX_PART_CHECKED_RECT_COLOR}) !important;
  }

  &[data-disabled] {
    fill: var(${COLORS_CHECKBOX.CHECKBOX_DISABLED_COLOR});
    color: var(${COLORS_CHECKBOX.CHECKBOX_DISABLED_COLOR});
  }

  &[data-selected] {
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

    &[data-disabled] {
      fill: var(${COLORS_CHECKBOX.CHECKBOX_FILLED_DISABLED_COLOR});
      color: var(${COLORS_CHECKBOX.CHECKBOX_FILLED_DISABLED_COLOR});

      & > path {
        fill: var(${COLORS_CHECKBOX.CHECKBOX_FILLED_DISABLED_COLOR});
        color: var(${COLORS_CHECKBOX.CHECKBOX_FILLED_DISABLED_COLOR});
      }
    }
  }
`;
