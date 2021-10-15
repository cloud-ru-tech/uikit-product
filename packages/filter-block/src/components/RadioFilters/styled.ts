import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { EXPORT_VARS } from '@sbercloud/uikit-theme';
import { Text2 } from '@sbercloud/uikit-typography';

export const buttonClassName = css`
  margin-top: 12px;
`;

export const RadioWrap = styled.div`
  display: flex;
  margin-bottom: 12px;
`;

export const Amount = styled(Text2)`
  display: inline-block;
  line-height: 20px;
  margin-left: 8px;
  color: var(${EXPORT_VARS.GREY[350]});
`;
