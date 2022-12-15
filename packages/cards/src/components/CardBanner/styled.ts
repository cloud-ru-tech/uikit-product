import { styled } from '@linaria/react';

import { TruncateString } from '@sbercloud/uikit-product-truncate-string';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './theme';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Wrapper = styled.div`
  width: 100%;
  height: 240px;
  min-width: 500px;
  background-color: var(${COLORS.background.default});
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  padding: 32px;
  transition: 0.2s ease-out;
  transition-property: background-color, box-shadow;
  box-sizing: border-box;

  &:hover {
    background-color: var(${COLORS.background.hover});
    box-shadow: var(${COLORS.background.shadow});
  }
`;

export const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 40px;
`;
export const RightSide = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

export const ImageWrapper = styled.div`
  border-radius: 12px;
  width: 176px;
  height: 100%;
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
  margin: 0 0 12px 0;
`;

export const Description = styled(TruncateString)`
  color: var(${COLORS.description});
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  flex-grow: 1;
  gap: 8px;
`;
