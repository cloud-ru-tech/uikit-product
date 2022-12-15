import { styled } from '@linaria/react';

import { TruncateString } from '@sbercloud/uikit-product-truncate-string';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './theme';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Title = styled(TruncateString)`
  flex-shrink: 0;
  transition: 0.2s ease-out;
  transition-property: color;
  color: var(${COLORS.title.default});
`;

export const Description = styled(TruncateString)`
  flex-shrink: 0;
  color: var(${COLORS.description});
`;

export const Wrapper = styled.div`
  width: 100%;
  height: fit-content;
  max-height: 124px;
  box-sizing: border-box;
  background-color: transparent;
  border-radius: 8px;
  gap: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  cursor: pointer;
  padding: 16px;
  transition: 0.2s ease-out;
  transition-property: border;
  border: 1px solid var(${COLORS.border.default});

  &:hover {
    border: 1px solid var(${COLORS.border.hover});
  }

  &&:hover ${Title} {
    color: var(${COLORS.title.hover});
  }
`;
