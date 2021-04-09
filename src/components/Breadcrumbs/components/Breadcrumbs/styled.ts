import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { COLORS_BREADCRUMBS } from 'theme/color/vars';

export const ContainerStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  max-width: 100%;
  overflow: hidden;
`;

export const ItemStyled = styled.div<{ isFixedWidth: boolean }>`
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  max-width: ${({ isFixedWidth }) => (isFixedWidth ? '200px' : 'auto')};

  &:first-child:last-child {
    max-width: ${({ isFixedWidth }) =>
      isFixedWidth ? 'calc(100% - 20px)' : 'auto'};
  }
`;

export const ItemTextStyled = styled.p<{ isActive?: boolean }>`
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 20px;
  line-height: 26px;
  color: ${({ isActive }) =>
    isActive
      ? `var(${COLORS_BREADCRUMBS.ACTIVE_COLOR})`
      : `var(${COLORS_BREADCRUMBS.INACTIVE_COLOR})`};
  margin: 0;
  white-space: nowrap;

  &[data-link] {
    cursor: pointer;
  }
`;

export const chevronClassName = css`
  min-width: 24px;
  & path {
    fill: var(${COLORS_BREADCRUMBS.INACTIVE_COLOR});
  }
`;

export const cutTextClassName = css`
  overflow: hidden;
`;

export const ChildrenContainerStyled = styled.div`
  margin-left: 8px;
  width: 100%;
  display: flex;
`;
