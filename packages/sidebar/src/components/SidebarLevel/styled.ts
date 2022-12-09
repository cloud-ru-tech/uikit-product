import { styled } from '@linaria/react';

import { TRANSITION_TIMING } from '../Sidebar/constants';
import { TransitionDirection } from './constants';

export const Wrapper = styled.div`
  transition-property: transform;
  transition-timing-function: ease-in-out;
  will-change: transform;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  &[data-has-title] {
    display: grid;
    grid-template-rows: 0fr auto;
  }

  &[data-transition-status='exiting'] {
    transition-duration: ${TRANSITION_TIMING.levelSlideOut}ms;
  }

  &[data-transition-status='entering'],
  &[data-transition-status='entered'] {
    transition-duration: ${TRANSITION_TIMING.levelSlideIn}ms;
  }

  &[data-transition-direction='${TransitionDirection.Backward}'] {
    &[data-transition-status='exiting'] {
      transform: translateX(-100%);
    }

    &[data-transition-status='entering'] {
      transform: translateX(100%);
    }
  }

  &[data-transition-direction='${TransitionDirection.Forward}'] {
    &[data-transition-status='exiting'] {
      transform: translateX(100%);
    }

    &[data-transition-status='entering'] {
      transform: translateX(-100%);
    }
  }
`;
