import { styled } from '@linaria/react';

import { TRANSITION_DURATION } from './constants';

export const Wrapper = styled.div<{ width: string | number }>`
  overflow: hidden;
  position: relative;
  transition: width ${TRANSITION_DURATION}ms ease-in-out;
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
