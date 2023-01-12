import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { EXPORT_VARS } from '@sbercloud/uikit-product-theme';
import { TEXT_2_STYLES } from '@sbercloud/uikit-product-typography';

export const buttonClassName = css`
  margin-top: 12px;
`;

export const RadioWrap = styled.div`
  display: flex;

  &:not(:last-child) {
    margin-bottom: 12px;
  }
`;

export const Amount = styled.span`
  ${TEXT_2_STYLES};
  display: inline-block;
  line-height: 20px;
  margin-left: 8px;
  color: var(${EXPORT_VARS.GREY[350]});
`;
