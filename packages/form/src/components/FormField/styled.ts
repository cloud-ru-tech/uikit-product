import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-theme';
import { H4_STYLES, TEXT_3_STYLES } from '@sbercloud/uikit-typography';

const { COLORS_FORM_FIELD } = DEPRECATED_EXPORT_VARS;

export const hintClassName = css`
  fill: var(${COLORS_FORM_FIELD.HINT_COLOR});
`;

export const tooltipTriggerClassName = css`
  display: inline-flex;
  margin-left: 8px;
`;

export const Wrapper = styled.div``;

export const Label = styled.h4`
  ${H4_STYLES};
  display: flex;
  align-items: center;

  margin-bottom: 8px;
`;

export const Description = styled.span`
  ${TEXT_3_STYLES};
  display: block;
  margin-top: 4px;
  color: var(${COLORS_FORM_FIELD.DESCRIPTION_COLOR});
`;

export const Error = styled.span`
  ${TEXT_3_STYLES};
  display: block;
  margin-top: 4px;
  color: var(${COLORS_FORM_FIELD.ERROR_COLOR});

  + ${Description} {
    margin-top: 8px;
  }
`;

export const Required = styled.span`
  ${TEXT_3_STYLES};
  display: block;
  margin-top: 4px;
  color: var(${COLORS_FORM_FIELD.REQUIRED_COLOR});

  + ${Description} {
    margin-top: 8px;
  }
`;
