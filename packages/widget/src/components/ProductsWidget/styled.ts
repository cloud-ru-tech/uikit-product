import { styled } from '@linaria/react';

import { themeVars } from '@sbercloud/figma-tokens-cloud-platform';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  grid-column: span 12;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${themeVars.dimension['050m']};
`;

export const ArrowWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const PageNumber = styled.span`
  ${themeVars.sans.label.l}

  color: ${themeVars.sys.neutral.textMain};
`;

export const PageTotal = styled.span`
  ${themeVars.sans.body.m}

  margin-right: ${themeVars.dimension['050m']};
  color: ${themeVars.sys.neutral.textSupport};
`;
