import { styled } from '@linaria/react';

export const Wrapper = styled.div`
  position: relative;
`;

export const Content = styled.div`
  &[data-active] {
    left: 0;
    position: absolute;
    top: 0;
    z-index: 1;
  }
`;

export const Fallback = styled.div<{ width: string | number }>`
  width: ${props => (typeof props.width === 'number' ? `${props.width}px` : props.width)};
`;
