import { css } from '@linaria/core';
import { EXPORT_VARS } from '@sbercloud/uikit-theme';

const { COLORS_DATEPICKER } = EXPORT_VARS;

export const hiddenInputClassName = css`
  border: 0;
  outline: 0;
  background: transparent;
  padding: 0;
  height: 21px;

  &:focus {
    color: var(${COLORS_DATEPICKER.INPUT_EDITABLE_TEXT});
    background-color: var(${COLORS_DATEPICKER.INPUT_EDITABLE_BACKGROUND});
    caret-color: transparent;
  }

  &::selection {
    background: transparent;
  }
`;
