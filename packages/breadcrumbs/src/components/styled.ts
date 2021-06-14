import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { EXPORT_VARS } from '@sbercloud/uikit-theme';

const { COLORS_BREADCRUMBS } = EXPORT_VARS;

export const ContainerStyled = styled.div`
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
`;

export const ItemStyled = styled.div<{ isFixedWidth: boolean }>`
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  max-width: ${({ isFixedWidth }) => (isFixedWidth ? '200px' : 'auto')};
  font-size: 20px;
  line-height: 26px;

  &:first-child:last-child {
    max-width: ${({ isFixedWidth }) => (isFixedWidth ? 'calc(100% - 20px)' : 'auto')};
  }
`;

export const ItemTextStyled = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: inherit;
  line-height: inherit;
  color: var(${COLORS_BREADCRUMBS.INACTIVE_COLOR});
  fill: var(${COLORS_BREADCRUMBS.INACTIVE_COLOR});
  margin: 0;
  white-space: nowrap;

  &[data-link] {
    cursor: pointer;
  }

  &[data-active] {
    color: var(${COLORS_BREADCRUMBS.ACTIVE_COLOR});
    fill: var(${COLORS_BREADCRUMBS.ACTIVE_COLOR});
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
  font-size: inherit;
  line-height: inherit;
`;

export const ChildrenContainerStyled = styled.div`
  margin-left: 8px;
  display: inline-flex;
`;

export const Collapsed = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
`;
