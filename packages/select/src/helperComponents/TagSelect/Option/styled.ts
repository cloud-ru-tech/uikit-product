import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { ButtonIcon } from '@sbercloud/uikit-react-button';
import { Tag } from '@sbercloud/uikit-react-tag';
import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-theme';
import { TYPOGRAPHY_VARIABLES } from '@sbercloud/uikit-typography';

const { TEXT_4 } = TYPOGRAPHY_VARIABLES;
const { COLORS_SELECT } = DEPRECATED_EXPORT_VARS;

export const StyledTagOption = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const optionClass = css`
  &[data-is-edit='true'] {
    background-color: ${COLORS_SELECT.DROPDOWN_FOCUS_BACKGROUND} !important;
  }

  &:hover {
    cursor: pointer;
  }
`;

export const StyledTagButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  line-height: 0;
  flex-shrink: 0;
`;

export const StyledTagButton = styled(ButtonIcon)`
  fill: var(${COLORS_SELECT.DROPDOWN_ICON_COLOR}) !important;
  color: var(${COLORS_SELECT.DROPDOWN_ICON_COLOR}) !important;
  background: transparent !important;
  &:focus,
  &:hover {
    fill: var(${COLORS_SELECT.DROPDOWN_ICON_HOVER_COLOR}) !important;
    background: transparent !important;
  }

  &[data-disabled] {
    cursor: not-allowed;
    fill: var(${COLORS_SELECT.TAG_NAME_DISABLED_BUTTON_FILL}) !important;

    &:focus,
    &:hover {
      fill: var(${COLORS_SELECT.TAG_NAME_DISABLED_BUTTON_FILL}) !important;
    }
  }
`;

export const StyledTagOptionLabel = styled(Tag)`
  margin-right: 12px;
`;

export const colorPickerClassName = css`
  padding: 0 2px;
`;

export const NotValidMessage = styled.div`
  ${TEXT_4};
  padding-top: 8px;
  color: var(${COLORS_SELECT.TAG_NAME_NOT_VALID_MESSAGE});
`;
