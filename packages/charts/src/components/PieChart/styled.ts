import { styled } from '@linaria/react';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Wrapper = styled.div<{ width?: number; height?: number }>`
  display: flex;
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  height: ${({ height }) => (height ? `${height}px` : '100%')};
  flex-direction: column;
  box-sizing: border-box;
  background-color: var(${COLORS.BACKGROUND});
  border-radius: 8px;
  padding: 24px;
`;

export const Title = styled.div`
  padding-bottom: 24px;
  font-size: 20px;
  font-weight: bold;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
  height: calc(100% - 50px);
  justify-content: space-between;
`;

export const LegendWrapper = styled.div`
  min-width: 25%;
  max-width: 33%;
`;

export const PieWrapper = styled.div`
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SvgText = styled.text`
  text-anchor: middle;
  visibility: hidden;
  width: 30px;
  font-size: 5px;
  word-break: break-all;
  white-space: nowrap;

  &[data-hovered] {
    visibility: visible;
  }

  &[data-bolder] {
    font-weight: 700;
  }
`;
