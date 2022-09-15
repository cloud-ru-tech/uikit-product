import { styled } from '@linaria/react';

import { CSS_BREAKPOINTS } from '@sbercloud/uikit-product-utils';

export const Wrapper = styled.div`
  grid-area: header-project-selector;
  margin-right: 8px;

  @media ${CSS_BREAKPOINTS.mobile} {
    margin: 8px 16px;
  }
`;

export const List = styled.ul`
  margin: 0;
  padding: 0;
`;
