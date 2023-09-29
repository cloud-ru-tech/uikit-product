import { styled } from '@linaria/react';

import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-product-theme';

const { COLORS_GENERAL } = DEPRECATED_EXPORT_VARS;

export const ContentHiderStyled = styled.div<{
  showContent: boolean;
  displayedHeight: number;
}>`
  position: relative;
  overflow: hidden;
  margin-bottom: 5px;
  max-height: ${({ showContent, displayedHeight }) => (!showContent ? `${displayedHeight}px` : '100%')};
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
  bottom: 0;
  left: 0;
  width: 100%;
  height: 83px;
  z-index: 2;
  /* stylelint-disable function-disallowed-list */
  background: linear-gradient(
    180deg,
    rgba(250, 250, 250, 0%) 0%,
    ${({ backgroundColor }) => backgroundColor || `var(${COLORS_GENERAL.BACKGROUND})`} 83.33%
  );
`;
