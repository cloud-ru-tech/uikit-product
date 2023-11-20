import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './theme';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

import { Size } from '../helpers/types';

export const ContainerStyled = styled.div`
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
  visibility: hidden;

  &[data-visible] {
    visibility: visible;
  }
`;

export const ItemStyled = styled.div<{ width?: number }>`
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: ${({ width }) => (width ? `${width}px` : 'auto')};

  &[data-size=${Size.Big}] {
    font-size: 20px;
    line-height: 26px;
  }

  &[data-size=${Size.Medium}] {
    font-size: 16px;
    line-height: 24px;
  }

  &[data-size=${Size.Small}] {
    font-size: 12px;
    line-height: 16px;
  }

  &[data-fixed-width] {
    max-width: 200px;
  }

  &:first-child:last-child {
    &[data-fixed-width] {
      max-width: calc(100% - 20px);
    }
  }
`;

export const ItemTextStyled = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: inherit;
  line-height: inherit;
  color: var(${COLORS.label.inactive});
  fill: var(${COLORS.label.inactive});
  margin: 0;
  white-space: nowrap;

  &[data-cursor] {
    cursor: pointer;
  }

  &[data-active] {
    color: var(${COLORS.label.active});
    fill: var(${COLORS.label.active});
  }
`;

export const chevronClassName = css`
  min-width: 24px;

  & path {
    fill: var(${COLORS.icon});
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
