import { styled } from '@linaria/react';

import { COLORS } from '../themes';

export const Legend = styled.div`
  display: flex;
  flex-direction: column;
  color: var(${COLORS.LEGEND_TITLE});
`;

export const LegendItemWrapper = styled.div`
  color: var(${COLORS.LEGEND_ITEM});
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 8px;
  justify-content: space-between;
`;

export const Dot = styled.span<{ color: string }>`
  display: inline-block;
  min-width: 8px;
  min-height: 8px;
  width: 8px;
  height: 8px;
  border-radius: 100%;

  margin-right: 12px;
  background-color: ${({ color }) => color};
`;

export const LegendDividerWrapper = styled.div`
  margin: 16px 0;
`;

export const LegendValue = styled.span`
  font-weight: 600;
`;

export const LegendItemTitle = styled.span`
  display: flex;
  align-items: center;
`;
