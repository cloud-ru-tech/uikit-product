import { styled } from '@linaria/react';

import { EXPORT_VARS } from '@sbercloud/uikit-product-theme';
import { TruncateString } from '@sbercloud/uikit-product-truncate-string';
import { ANIMATIONS } from '@sbercloud/uikit-product-utils';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './theme';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

const { GREY } = EXPORT_VARS;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 354px;
  padding: 24px;
  border-radius: 8px;
  background-color: var(${COLORS.background.default});
  transition: ${ANIMATIONS.TRANSITION};
  transition-property: background-color, box-shadow;

  &:hover {
    background-color: var(${COLORS.background.hover});
    box-shadow: var(${COLORS.background.shadow});
  }
`;

export const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  margin: -8px 0 0 -8px;
  fill: var(${COLORS.image.primary.icon});
`;

export const Title = styled(TruncateString)`
  margin-top: 40px;
  margin-bottom: 12px;
`;

export const Description = styled(TruncateString)`
  color: var(${GREY[350]});
`;

export const Actions = styled.div`
  margin-top: auto;
`;
