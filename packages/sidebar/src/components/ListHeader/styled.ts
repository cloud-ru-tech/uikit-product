import { styled } from '@linaria/react';

import { ButtonIcon } from '@sbercloud/uikit-product-button';
import { ANIMATIONS } from '@sbercloud/uikit-product-utils';

export const Title = styled.div`
  position: relative;

  overflow: hidden;
`;

export const TitleWrap = styled.div`
  position: relative;

  display: flex;
  align-items: center;

  transition: opacity ${ANIMATIONS.TRANSITION};

  &[data-hide] {
    pointer-events: none;

    opacity: 0;
  }
`;

export const SearchButton = styled(ButtonIcon)`
  position: absolute;
  right: 16px;
`;

export const SearchWrap = styled.div`
  pointer-events: none;
  will-change: transform;

  position: absolute;
  top: 50%;
  left: 100%;
  transform: translateY(-50%);

  width: 100%;
  padding: 0 16px;

  transition: transform ${ANIMATIONS.TRANSITION};

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
