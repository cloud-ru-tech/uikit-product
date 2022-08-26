import { styled } from '@linaria/react';

import { H3_STYLES } from '@sbercloud/uikit-product-typography';
import { SHADOW } from '@sbercloud/uikit-product-utils';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const TriggerWrapper = styled.span`
  display: inline-flex;
`;

export const FloatingWrapper = styled.div<{ strategy: string }>`
  position: ${({ strategy }) => strategy};
  top: 40px;
  right: 8px;
  width: 100%;
  max-width: 460px;
  height: auto;
  max-height: calc(100vh - 48px);
  background-color: var(${COLORS.background});
  border-radius: 12px;
  box-shadow: ${SHADOW.LARGE};
  display: flex;
  flex-direction: column;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid var(${COLORS.divider});
`;

export const Title = styled.h3`
  ${H3_STYLES};
  display: flex;
  align-items: center;
  color: var(${COLORS.title});
  gap: 10px;
`;

export const ControlPanel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 38px 12px 24px;
  min-height: 52px;
  box-sizing: border-box;
`;

export const ChipsWrapper = styled.div`
  display: flex;
  gap: 4px;
`;

export const CardsWrapper = styled.div`
  padding-left: 8px;
  overflow-y: auto;
`;

export const CardWrapper = styled.div`
  padding: 0;
  margin: 0 8px 8px 0;
`;

export const NoDataWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  min-height: 200px;
  padding: 80px 56px;
`;

export const FooterWrapper = styled.div`
  border-top: 1px solid var(${COLORS.divider});
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 8px 0;
`;
