import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { Button } from '@sbercloud/uikit-react-button';
import { Tag } from '@sbercloud/uikit-react-tag';
import { EXPORT_VARS } from '@sbercloud/uikit-theme';

const { COLORS_SELECT } = EXPORT_VARS;

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

export const StyledTag = styled(Tag)`
  padding: 0 8px;
  margin: 0;
  flex-grow: 1;
  display: block;
  text-overflow: clip;
`;

export const StyledTagButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  line-height: 0;
  flex-shrink: 0;
`;

export const StyledTagButton = styled(Button)`
  fill: var(${COLORS_SELECT.DROPDOWN_ICON_COLOR}) !important;
  color: var(${COLORS_SELECT.DROPDOWN_ICON_COLOR}) !important;
  background: transparent !important;
  &:focus,
  &:hover {
    fill: var(${COLORS_SELECT.DROPDOWN_ICON_HOVER_COLOR}) !important;
    fill: var(${COLORS_SELECT.DROPDOWN_ICON_HOVER_COLOR}) !important;
    background: transparent !important;
  }
`;

export const StyledTagOptionLabel = styled(Tag)`
  margin-right: 12px;
`;

export const tagInputClassName = css`
  line-height: 20px;
  font-size: 14px;
`;

export const colorPickerClassName = css`
  padding: 0 2px;
`;
