import { styled } from '@linaria/react';

import { TRANSITION_TIMING } from '../../constants';

export const Accordion = styled.div`
  overflow: hidden;
`;

export const AccordionFoldable = styled.div<{ maxHeight: number | undefined }>`
  overflow: hidden;
  max-height: ${({ maxHeight }) => (maxHeight === undefined ? 'none' : `${maxHeight}px`)};
  transition: max-height ${TRANSITION_TIMING.accordionFolding}ms ease-in-out;
  will-change: max-height;
  display: grid;
  row-gap: 4px;

  > ${Accordion}:first-child {
    margin-top: 4px;
  }
`;
