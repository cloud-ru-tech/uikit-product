import { styled } from '@linaria/react';

import { TRANSITION_DURATION } from './constants';

export const Wrapper = styled.div<{ width: string | number }>`
  position: relative;

  overflow: hidden;

  width: ${props => (typeof props.width === 'number' ? `${props.width}px` : props.width)};

  transition: width ${TRANSITION_DURATION}ms ease-in-out;
`;

export const Content = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  &[data-hidden] {
    pointer-events: none;

    visibility: hidden;
  }
`;
