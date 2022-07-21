import { styled } from '@linaria/react';

import { ANIMATIONS } from '@sbercloud/uikit-product-utils';

export const Wrapper = styled.div<{ width: string | number }>`
  overflow: hidden;
  position: relative;
  transition: width ${ANIMATIONS.TRANSITION};
  width: ${props => (typeof props.width === 'number' ? `${props.width}px` : props.width)};
`;

export const Content = styled.div`
  left: 0;
  position: absolute;
  top: 0;

  &[data-hidden] {
    pointer-events: none;
    visibility: hidden;
  }
`;
