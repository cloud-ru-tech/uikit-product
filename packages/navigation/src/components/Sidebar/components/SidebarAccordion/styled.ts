import { styled } from '@linaria/react';

import { TRANSITION_TIMING } from '../../constants';

export const Accordion = styled.div`
  overflow: hidden;
`;

export const AccordionFoldable = styled.div<{ maxHeight: number }>`
  overflow: hidden;
  max-height: ${({ maxHeight }) => `${maxHeight}px`};
  transition: max-height ${TRANSITION_TIMING.common}ms ease-in-out;
  will-change: max-height;
`;
