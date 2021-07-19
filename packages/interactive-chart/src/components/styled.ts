import { styled } from '@linaria/react';
import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-theme';

const { COLORS_INTERACTIVE_CHART } = DEPRECATED_EXPORT_VARS;
export const Wrapper = styled.div`
  & .uplot {
    font-family: inherit;
    background-color: var(${COLORS_INTERACTIVE_CHART.BACKGROUND});
    padding: 16px 0;
    border-radius: 8px;
  }

  & .uplot .u-title {
    font-size: 20px;
    text-align: unset;
    padding-left: 24px;
  }

  /* mouse cross hair */
  & .u-hz .u-cursor-x,
  & .u-vt .u-cursor-y,
  & .u-hz .u-cursor-y,
  & .u-vt .u-cursor-x {
    border-color: var(${COLORS_INTERACTIVE_CHART.CURSOR_AIM});
  }

  /* Selected area */
  & .u-select {
    background-color: var(${COLORS_INTERACTIVE_CHART.SELECTED_AREA});
  }

  & table .u-series .u-marker {
    width: 14px;
    height: 14px;
    border-radius: 14px;
  }
`;
