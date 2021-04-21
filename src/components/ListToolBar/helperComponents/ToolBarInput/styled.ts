import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { COLORS_INPUT, COLORS_TOOLBAR } from 'theme/color/vars';

export const searchIconClassname = css`
  fill: var(${COLORS_INPUT.INPUT_ICON_COLOR});
`;

export const crossIconClassName = css`
  fill: var(${COLORS_INPUT.INPUT_ICON_COLOR});
  cursor: pointer;
  &:focus,
  &:hover {
    fill: var(${COLORS_INPUT.INPUT_ICON_HOVER_COLOR});
  }
`;

export const inputClassName = css`
  &:not([data-disabled='true']) {
    &:hover,
    &:focus {
      background-color: var(${COLORS_TOOLBAR.BACKGROUND});
    }
  }

  &::placeholder {
    color: var(${COLORS_TOOLBAR.PLACEHOLDER_COLOR});
  }
`;

export const InputWrapStyled = styled.div`
  flex-grow: 1;

  &[data-has-prev-sibling] {
    border-left: 1px solid var(${COLORS_TOOLBAR.INPUT_BORDER});
  }

  &[data-has-next-sibling] {
    border-right: 1px solid var(${COLORS_TOOLBAR.INPUT_BORDER});
  }
`;
