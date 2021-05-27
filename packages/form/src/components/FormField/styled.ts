import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { EXPORT_VARS } from '@sbercloud/uikit-theme';
import { H4, Text3 } from '@sbercloud/uikit-typography';

const { COLORS_FORM_FIELD } = EXPORT_VARS;

export const hintClassName = css`
  fill: var(${COLORS_FORM_FIELD.HINT_COLOR});

  margin-left: 8px;
`;

export const tooltipTriggerClassName = css`
  display: inline-flex;
`;

export const Wrapper = styled.div``;

export const Label = styled(H4)`
  display: flex;
  align-items: center;

  margin-bottom: 8px;
`;

export const Error = styled(Text3)`
  color: var(${COLORS_FORM_FIELD.ERROR_COLOR});
`;
