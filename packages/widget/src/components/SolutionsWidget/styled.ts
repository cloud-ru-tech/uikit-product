import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { CSS_BREAKPOINTS } from '@sbercloud/uikit-product-utils';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  grid-column: span 12;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;

  @media ${CSS_BREAKPOINTS.mobile} {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

export const cardClassName = css`
  flex-grow: 0;
`;
