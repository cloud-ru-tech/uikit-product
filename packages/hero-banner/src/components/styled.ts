import { styled } from '@linaria/react';

import { Text1 } from '@sbercloud/uikit-typography';

export const Banner = styled.div`
  min-height: 180px;
  padding: 40px;
  border-radius: 8px;
  background-size: cover;
`;

export const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 560px;
`;

export const Text = styled(Text1)`
  margin-top: 20px;
`;
