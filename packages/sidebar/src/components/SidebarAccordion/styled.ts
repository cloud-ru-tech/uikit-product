import { styled } from '@linaria/react';

import { TRANSITION_TIMING } from '../Sidebar/constants';

export const Accordion = styled.div`
  overflow: hidden;
`;

export const AccordionFoldable = styled.div<{ maxHeight: number | undefined }>`
  overflow: hidden;
  transition: max-height ${TRANSITION_TIMING.accordionFolding}ms ease-in-out;
  will-change: max-height;
  display: grid;
  row-gap: 4px;

  > ${Accordion}:first-child {
    margin-top: 4px;
  }

  &[data-mobile] {
    row-gap: 8px;

    > ${Accordion}:first-child {
      margin-top: 8px;
    }
  }

  &[data-transition-status='entering'],
  &[data-transition-status='entered'] {
    max-height: ${({ maxHeight }) => (maxHeight === undefined ? 'none' : `${maxHeight}px`)};
  }

  &[data-transition-status='exiting'],
  &[data-transition-status='exited'] {
    max-height: 0;
  }
`;
