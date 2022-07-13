import { styled } from '@linaria/react';

import { H5_STYLES, TEXT_2_STYLES } from '@sbercloud/uikit-product-typography';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Wrapper = styled.div`
  background-color: var(${COLORS.background.default});
  border-radius: 100px;
  border: 1px solid var(${COLORS.border.default});
  display: flex;
  grid-area: header-balance-tooltip;
  padding: 4px;
  width: fit-content;
`;

export const Balance = styled.button`
  background: none;
  border: none;
  color: var(${COLORS.text.default});
  column-gap: 4px;
  cursor: pointer;
  display: flex;
  margin: 0 4px;
  padding: 0;

  &:disabled {
    cursor: default;
  }
`;

export const RechargeButton = styled.div`
  display: flex;
  margin-right: 4px;
`;

export const Icon = styled.div`
  ${RechargeButton} + & {
    margin-left: 4px;
  }
`;

export const RegularText = styled.span`
  ${TEXT_2_STYLES};
`;

export const AccentText = styled.span`
  ${H5_STYLES};
`;
