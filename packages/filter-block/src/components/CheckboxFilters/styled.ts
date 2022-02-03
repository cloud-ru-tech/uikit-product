import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { EXPORT_VARS } from '@sbercloud/uikit-theme';
import { TEXT_2_STYLES } from '@sbercloud/uikit-typography';

export const CheckboxWrap = styled.div`
  margin-bottom: 12px;
  display: flex;
`;

export const Amount = styled.span`
  ${TEXT_2_STYLES};
  display: inline-block;
  line-height: 20px;
  margin-left: 8px;
  color: var(${EXPORT_VARS.GREY[350]});
`;

export const buttonClassName = css`
  margin-top: 12px;
`;
