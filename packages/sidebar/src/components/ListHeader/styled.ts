import { styled } from '@linaria/react';

import { ButtonIcon } from '@sbercloud/uikit-product-button';
import { ANIMATIONS } from '@sbercloud/uikit-product-utils';

export const Title = styled.div`
  position: relative;
  overflow: hidden;
`;

export const TitleWrap = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  transition: opacity ${ANIMATIONS.TRANSITION};

  &[data-hide] {
    opacity: 0;
    pointer-events: none;
  }
`;

export const SearchButton = styled(ButtonIcon)`
  position: absolute;
  right: 16px;
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
