import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { Tag } from 'components/Tag';
import { Button } from 'components/Button';
import { COLORS_SELECT } from 'theme/color/vars';

export const StyledTagOption = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const optionClass = css`
  &[data-is-edit='true']: {
    background-color: ${COLORS_SELECT.DROPDOWN_FOCUS_BACKGROUND} !important;
  }
`;

export const StyledTag = styled(Tag)`
  padding: 0;
  margin: 0;
  flex-grow: 1;
  display: block;
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
