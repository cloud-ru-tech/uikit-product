import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { EXPORT_VARS } from '@sbercloud/uikit-product-theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  width: 300px;
  border-radius: 8px;
`;

export const Inputs = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const inputsDividerClassName = css`
  fill: var(${EXPORT_VARS.GREY[200]});
`;

export const inputClassNameBase = css`
  flex-basis: 100%;
`;

export const inputClassNamePeriod = css`
  flex-basis: calc(50% - 8px - 10px);
`;

export const SelectionWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

export const Arrows = styled.div`
  display: flex;
  margin-left: auto;
`;

export const monthYearSelectionClassName = css`
  &:hover {
    color: var(${EXPORT_VARS.GREY[600]});
  }

  transition: color 0.3s;
`;

export const arrowlassName = css`
  fill: var(${EXPORT_VARS.GREY[200]});

  &:hover {
    fill: var(${EXPORT_VARS.GREY[600]});
  }

  transition: fill 0.3s;
`;

export const menuItemMonthClassName = css`
  width: 100px;
`;

export const menuItemYearClassName = css`
  width: 60px;
`;
