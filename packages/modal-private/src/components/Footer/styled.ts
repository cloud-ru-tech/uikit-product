import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { ANIMATIONS } from '@sbercloud/uikit-product-utils';

import { FooterAlign } from './constants';

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;

  box-sizing: border-box;
  padding: 0 32px;

  &[data-align=${FooterAlign.Right}] {
    justify-content: flex-end;
  }

  &[data-align=${FooterAlign.Center}] {
    flex-direction: column-reverse;
    justify-content: center;
  }
`;

export const loadingWheelClassName = css`
  ${ANIMATIONS.LOADING_WHEEL};
`;
