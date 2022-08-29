import { styled } from '@linaria/react';

import { ANIMATIONS } from '@sbercloud/uikit-product-utils';

export const BackButtonWrapper = styled.div`
  display: inline-flex;
  padding: 8px 16px;
`;

export const Title = styled.div`
  position: relative;
  overflow: hidden;
`;

export const TitleWrap = styled.div`
  display: flex;
  align-items: center;
  padding-right: 16px;
  transition: opacity ${ANIMATIONS.TRANSITION};

  &[data-hide] {
    opacity: 0;
    pointer-events: none;
  }
`;

export const SearchWrap = styled.div`
  padding: 0 16px;
  position: absolute;
  top: 50%;
  left: 100%;
  width: 100%;
  pointer-events: none;
  transition: transform ${ANIMATIONS.TRANSITION};
  will-change: transform;
  transform: translateY(-50%);

  &[data-show] {
    pointer-events: auto;
    transform: translate(-100%, -50%);
  }
`;

export const DividerWrap = styled.div`
  margin: 4px 0;
  transition: opacity ${ANIMATIONS.TRANSITION};

  &[data-hide] {
    opacity: 0;
  }
`;
