import { styled } from '@linaria/react';

import { H1_STYLES, TEXT_1_STYLES } from '@sbercloud/uikit-typography';

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

export const Header = styled.h1`
  ${H1_STYLES};
`;

export const Text = styled.span`
  ${TEXT_1_STYLES};
  margin-top: 20px;
`;
