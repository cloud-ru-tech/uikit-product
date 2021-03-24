import { styled } from '@linaria/react';

import { COLORS_GENERAL } from 'theme/color/vars';

export const ContentHiderStyled = styled.div<{
  showContent: boolean;
  displayedHeight: number;
}>`
  position: relative;
  overflow: hidden;
  margin-bottom: 5px;
  max-height: ${({ showContent, displayedHeight }) =>
    !showContent ? `${displayedHeight}px` : '100%'};
`;

export const ContentWrapperStyled = styled.div`
  position: relative;
  z-index: 1;
`;

export const ContentWrapperGradientStyled = styled.div<{
  showContent: boolean;
  backgroundColor?: string;
}>`
  display: ${({ showContent }) => (showContent ? 'none' : 'block')};
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 83px;
  z-index: 2;
  background: linear-gradient(
    180deg,
    rgba(250, 250, 250, 0) 0%,
    ${({ backgroundColor }) =>
        backgroundColor || `var(${COLORS_GENERAL.BACKGROUND})`}
      83.33%
  );
`;
