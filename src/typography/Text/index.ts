import { styled } from '@linaria/react';

import { COLORS_TYPOGRAPHY } from 'theme/color/vars';

export const Text1 = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  margin: 0;
`;

export const Text2 = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  margin: 0;
`;

export const Text2Link = styled.a`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  margin: 0;
  color: var(${COLORS_TYPOGRAPHY.LINK});
  text-decoration: underline;
`;

export const Text3 = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  margin: 0;
`;

export const Text4 = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 15px;
  margin: 0;
`;
