import { styled } from '@linaria/react';

import { TruncateString } from '@sbercloud/uikit-product-truncate-string';
import { TEXT_3_STYLES } from '@sbercloud/uikit-product-typography';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './theme';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const ImageWrapper = styled.div`
  width: 100%;
  flex-shrink: 0;
  height: 240px;
  margin-bottom: 12px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
`;

export const Image = styled.div<{ backgroundImage?: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background-size: cover;
  background-position: center;
  background-image: ${({ backgroundImage }) => (backgroundImage ? `url(${backgroundImage})` : 'none')};
`;

export const Title = styled(TruncateString)`
  flex-shrink: 0;
  margin-bottom: 8px;
  transition: 0.2s ease-out;
  transition-property: color;
`;

export const Description = styled(TruncateString)`
  flex-shrink: 0;
  margin-bottom: 8px;
  color: var(${COLORS.description});
`;

export const Signature = styled.span`
  flex-shrink: 0;
  ${TEXT_3_STYLES};
  color: var(${COLORS.signature});
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-width: 240px;
  min-height: 300px;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  cursor: pointer;

  &&:hover ${Title} {
    color: var(${COLORS.title.hover});
  }
`;
