import { styled } from '@linaria/react';

export const FromWrapper = styled.div`
  &[data-has-footer] {
    padding-bottom: 8px;
  }
  &[data-has-header] {
    padding-top: 8px;
  }
`;
