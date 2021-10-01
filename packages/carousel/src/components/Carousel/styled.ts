import { styled } from '@linaria/react';

export const CarouselWrap = styled.div`
  width: 100%;
`;

export const WrapperContainer = styled.div<{ height: number }>`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: ${p => `${p.height}px`};
`;

export const InnerContainer = styled.div<{ width: number; containerWidth: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${p => `${p.containerWidth}px`};
  display: flex;
  flex-wrap: wrap;
  transition: transform ease-out 0.3s;
  transform: ${p => `translate(-${p.width}px)`};
`;

export const CarouselItem = styled.div<{ width: number }>`
  width: ${p => `${p.width}px`};
`;

export const HeaderWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 24px;
`;
