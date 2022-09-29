import { styled } from '@linaria/react';

import { H5_STYLES, TEXT_2_STYLES } from '@sbercloud/uikit-product-typography';
import { ANIMATIONS } from '@sbercloud/uikit-product-utils';

import { COLORS } from '../../themes';

export const Heading = styled.h5`
  ${H5_STYLES};

  padding: 0 16px;
  color: var(${COLORS.heading});
  margin-bottom: 8px;

  &[data-first-on-inner-level] {
    margin-top: 12px;
  }
`;

export const ListWrap = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    height: 48px;
    background: var(${COLORS.listFading});
    opacity: 0;
    transition: opacity ${ANIMATIONS.TRANSITION};
    pointer-events: none;
    z-index: 1;
  }

  &::before {
    top: 0;
    transform: rotate(180deg);
  }

  &::after {
    bottom: 0;
  }

  &[data-show-top-fading] {
    &::before {
      opacity: 1;
    }
  }

  &[data-show-bottom-fading] {
    &::after {
      opacity: 1;
    }
  }

  &[data-footer] {
    margin-top: 8px;

    &::before,
    &::after {
      display: none;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  padding-bottom: 26px;

  &[data-footer] {
    height: auto;
    padding-bottom: 0;
  }

  &[data-collapsed] {
    row-gap: 4px;
  }
`;

export const GroupWrapper = styled.div`
  &[data-hidden] {
    display: none;
  }
`;

export const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
`;

export const NoDataLabel = styled.div`
  ${TEXT_2_STYLES};

  color: var(${COLORS.noDataLabel});
  text-align: center;
`;
