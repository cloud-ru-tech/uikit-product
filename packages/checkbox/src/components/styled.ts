import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-theme';

const { COLORS_CHECKBOX } = DEPRECATED_EXPORT_VARS;

export const CheckboxStyled = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  border-style: none;
  z-index: -1;
  opacity: 0;
`;

export const CheckboxLabelStyled = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &[data-disabled] {
    color: var(${COLORS_CHECKBOX.CHECKBOX_DISABLED_TEXT_COLOR});
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
    }

    &[data-disabled] {
      fill: var(${COLORS_CHECKBOX.CHECKBOX_FILLED_DISABLED_COLOR});
      color: var(${COLORS_CHECKBOX.CHECKBOX_FILLED_DISABLED_COLOR});
    }
  }
`;
