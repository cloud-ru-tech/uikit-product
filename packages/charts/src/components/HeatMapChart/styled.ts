import { styled } from '@linaria/react';

import { H3_STYLES, H5_STYLES, TEXT_4_STYLES } from '@sbercloud/uikit-typography';

import { XAxisPosition } from './constants';
import { LEGEND_HEIGHT, TICKS_SIZE, TITLE_HEIGHT, X_AXIS_LABEL_HEIGHT } from './helpers/constants';
import { COLOR_VARS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Wrapper = styled.div`
  padding: 24px;
  background-color: var(${COLOR_VARS.BACKGROUND});
  border-radius: 8px;
`;

export const GridWrapper = styled.div<{ displayAsGrid: boolean }>`
  position: relative;
  display: ${props => (props.displayAsGrid ? 'grid' : 'block')};
  grid-auto-rows: minmax(min-content, max-content);
  grid-template-columns: auto 1fr;
`;

export const Title = styled.h3`
  ${H3_STYLES};
  margin-bottom: 24px;
  font-size: 20px;
  font-weight: bold;
  color: var(${COLOR_VARS.TITLE});
  height: ${TITLE_HEIGHT - 24}px;
`;

export const Legend = styled.div`
  margin-top: 24px;
  height: ${LEGEND_HEIGHT - 24}px;
`;

export const Gradient = styled.div<{ gradient: string }>`
  height: 20px;
  margin: 24px 0 8px;
  background-color: red !important;
  border-radius: 4px;
  background: ${props => props.gradient};
`;

export const LegendTicksWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Tick = styled.span`
  ${TEXT_4_STYLES};
  color: var(${COLOR_VARS.LABEL});
  font-size: 12px;
`;

export const Cell = styled.h5<{ color: string }>`
  ${H5_STYLES};
  color: ${props => props.color};
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const XAxisLabel = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 8px;
  color: var(${COLOR_VARS.LABEL});
  font-size: 12px;
  font-weight: 600;
  height: ${X_AXIS_LABEL_HEIGHT - 8}px;
  margin-left: 65px;
`;

export const YAxisLabel = styled.div`
  margin-right: 16px;
  transform: rotate(180deg);
  transform-origin: right, top;
  writing-mode: vertical-rl;
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  color: var(${COLOR_VARS.LABEL});
  &[data-x-axis-position='${XAxisPosition.Top}'] {
    margin-top: ${TICKS_SIZE}px;
  }
  &[data-x-axis-position='${XAxisPosition.Bottom}'] {
    margin-bottom: ${TICKS_SIZE}px;
  }
`;
