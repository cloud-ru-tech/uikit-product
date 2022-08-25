import { styled } from '@linaria/react';

import { CSS_BREAKPOINTS } from '@sbercloud/uikit-product-utils';

export const Wrapper = styled.div`
  align-items: center;
  column-gap: 16px;
  display: flex;
  grid-area: header-toolbar;
  justify-content: flex-end;

  @media ${CSS_BREAKPOINTS.mobile} {
    flex-direction: column;
    align-items: flex-start;
  }
`;
