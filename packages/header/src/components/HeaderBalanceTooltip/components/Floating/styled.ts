import { styled } from '@linaria/react';

export const Wrapper = styled.div`
  position: relative;
`;

export const Content = styled.div`
  &[data-active] {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
  }
`;

export const Fallback = styled.div<{ width: string | number }>`
  width: ${props => (typeof props.width === 'number' ? `${props.width}px` : props.width)};
`;
