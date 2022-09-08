import { styled } from '@linaria/react';

import { CSS_BREAKPOINTS } from '@sbercloud/uikit-product-utils';

import { TRANSITION_TIMING } from '../../constants';

export const Accordion = styled.div`
  overflow: hidden;
`;

export const AccordionFoldable = styled.div<{ maxHeight: number | undefined }>`
  overflow: hidden;
  max-height: ${({ maxHeight }) => (maxHeight === undefined ? 'none' : `${maxHeight}px`)};
  transition: max-height ${TRANSITION_TIMING.common}ms ease-in-out;
  will-change: max-height;
  display: grid;
  row-gap: 4px;

  > .${Accordion.__linaria.className}:first-child {
    margin-top: 4px;

    @media ${CSS_BREAKPOINTS.mobile} {
      margin-top: 8px;
    }
  }

  @media ${CSS_BREAKPOINTS.mobile} {
    row-gap: 8px;
  }
`;
