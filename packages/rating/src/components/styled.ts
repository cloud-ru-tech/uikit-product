import { styled } from '@linaria/react';

import { themeVars } from '@sbercloud/figma-tokens-cloud-platform';

export const MarkContainer = styled.div`
  display: flex;
  column-gap: 16px;
  flex-direction: row;
`;

export const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  border-radius: 100%;
  border: 1px solid ${themeVars.sys.neutral.decorDefault};
  color: ${themeVars.sys.neutral.decorActivated};

  &[data-selected] {
    color: ${themeVars.sys.yellow.accentDefault};
  }

  &[data-disabled] {
    pointer-events: none;
  }
`;
