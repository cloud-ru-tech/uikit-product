import { styled } from '@linaria/react';

import { H3_STYLES, TEXT_1_STYLES } from '@sbercloud/uikit-product-typography';

import { TruncatedTextWithTooltip } from '../../helperComponents/TruncatedTextWithTooltip';
import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './theme';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 300px;
  background-color: var(${COLORS.background});
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
`;

export const LeftSide = styled.div`
  width: 100%;
  padding: 32px 0 32px 32px;
  display: flex;
  flex-direction: column;
  max-width: 360px;
  flex-shrink: 0;
  box-sizing: border-box;
`;

export const RightSide = styled.div`
  max-width: 400px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-grow: 1;
`;

export const TitleWrapper = styled.div`
  display: flex;
  margin-bottom: 24px;
  align-items: center;
`;

export const Title = styled(TruncatedTextWithTooltip)`
  ${H3_STYLES};
  -webkit-line-clamp: 2;
`;

export const TitleImageWrapper = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  margin-right: 20px;
  overflow: hidden;
  flex-shrink: 0;
  position: relative;
`;

export const TitleImage = styled.div<{ backgroundImage?: string }>`
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

export const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  flex-grow: 1;
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
  background-position: left;
  background-image: ${({ backgroundImage }) => (backgroundImage ? `url(${backgroundImage})` : 'none')};
`;

export const Description = styled(TruncatedTextWithTooltip)`
  ${TEXT_1_STYLES};
  color: var(${COLORS.description});
  -webkit-line-clamp: 4;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  flex-grow: 1;
  gap: 8px;
`;
