import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import { VFC } from 'react';

import { TEXT_2_STYLES, TEXT_3_STYLES } from '@sbercloud/uikit-product-typography';
import { ANIMATIONS } from '@sbercloud/uikit-product-utils';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';
import { SwitchRowProps } from './types';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

enum SWITCH_ROW__CSS_VARS {
  title = '--switch-row__title-color',
  description = '--switch-row__description-color',
  icon = '--switch-row__icon-color',
}

export const styledSwitchRow = (SwitchRow: VFC<SwitchRowProps>): VFC<SwitchRowProps> => styled(SwitchRow)`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 12px;
  border-radius: 4px;
  background-color: var(${COLORS.background.default});
  transition: background-color ${ANIMATIONS.TRANSITION};
  position: relative;

  ${SWITCH_ROW__CSS_VARS.title}: var(${COLORS.title.default});
  ${SWITCH_ROW__CSS_VARS.description}: var(${COLORS.description.default});
  ${SWITCH_ROW__CSS_VARS.icon}: var(${COLORS.icon.default});

  &:hover {
    background-color: var(${COLORS.background.hover});
  }

  &[data-disabled] {
    background-color: var(${COLORS.background.disabled});

    ${SWITCH_ROW__CSS_VARS.title}: var(${COLORS.title.disabled});
    ${SWITCH_ROW__CSS_VARS.description}: var(${COLORS.description.disabled});
    ${SWITCH_ROW__CSS_VARS.icon}: var(${COLORS.icon.disabled});
  }
`;

export const Content = styled.div`
  padding-right: 12px;
`;

export const Title = styled.div`
  ${TEXT_2_STYLES};
  color: var(${SWITCH_ROW__CSS_VARS.title});
`;

export const titleTooltipClassName = css`
  margin-left: 4px;
  vertical-align: bottom;
  z-index: 3;
  position: relative;
  fill: var(${SWITCH_ROW__CSS_VARS.icon});
`;

export const Description = styled.div`
  ${TEXT_3_STYLES};
  margin-top: 4px;
  color: var(${SWITCH_ROW__CSS_VARS.description});
`;

export const SwitchLabel = styled.label`
  border-radius: inherit;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    cursor: pointer;
    border-radius: inherit;
  }

  &[data-disabled] {
    &:after {
      cursor: not-allowed;
    }
  }
`;
