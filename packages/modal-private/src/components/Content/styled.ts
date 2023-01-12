import { styled } from '@linaria/react';

import { Scroll } from '@sbercloud/uikit-product-scroll';

export const StyledScroll = styled(Scroll)`
  flex: 1 1 auto;

  box-sizing: border-box;
  max-width: calc(100% - 8px);
  min-height: 20px;
  padding: 0 24px 0 32px;
`;

export const Content = styled.div`
  flex: 1 1 auto;

  min-height: 20px;
  padding: 0 24px 0 32px;
`;
