import { styled } from '@linaria/react';

import { TRANSITION_TIMING } from '../../constants';

export const Main = styled.div`
  display: flex;
  overflow: hidden;

  position: relative;
  flex: 1 0 auto;
`;

export const Level = styled.div`
  transition-property: transform, opacity;
  transition-duration: ${TRANSITION_TIMING.hideLevel}ms;
  transition-timing-function: ease-in-out;
  will-change: transform, opacity;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  &[data-has-title] {
    display: grid;
    grid-template-rows: 0fr auto;
  }

  &[data-show='false'] {
    transform: translateX(100%);
    transition-duration: ${TRANSITION_TIMING.common}ms;

    &:not([data-hide]) {
      transition-duration: 0.15s;
    }
  }

  &[data-show='true'] {
    transform: translateX(0);
    transition-duration: ${TRANSITION_TIMING.hideLevel}ms;
  }

  &[data-hide] {
    transform: translateX(-100%);
  }
`;
