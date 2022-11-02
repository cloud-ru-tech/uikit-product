import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { PredefinedCloudLogo, PredefinedMLSpaceLogo } from '@sbercloud/uikit-product-predefined-icons-private';
import { Tag } from '@sbercloud/uikit-product-tag';
import { H1_STYLES, TEXT_1_STYLES } from '@sbercloud/uikit-product-typography';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

const BIG_GEAR_WHEEL_SECONDS_PERIOD = 60;

export const Wrapper = styled.div`
  background-color: var(${COLORS.background});
  height: 100%;
  border-radius: 8px;
  box-sizing: border-box;
  padding: 48px;
  gap: 48px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const CloudLogo = styled(PredefinedCloudLogo)`
  padding-bottom: 24px;
`;

export const MlSpaceLogo = styled(PredefinedMLSpaceLogo)`
  padding-bottom: 24px;
`;

export const Title = styled.h1`
  ${H1_STYLES};
`;

export const StatusCode = styled(Tag)`
  vertical-align: top;
  margin-left: 8px;
`;

export const ActionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ActionTitle = styled.div`
  ${TEXT_1_STYLES};
`;

export const ActionLinks = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

export const RightSide = styled.div`
  align-self: flex-end;
  justify-self: center;
  min-width: 500px;
  max-width: 862px;
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const rotateSmall = css`
  @keyframes rotating {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  transform-origin: center;
  transform-box: fill-box;
  animation: rotating ${(BIG_GEAR_WHEEL_SECONDS_PERIOD * 13) / 17}s linear infinite;
`;

export const rotateBig = css`
  @keyframes rotating {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(-360deg);
    }
  }
  transform-origin: center;
  transform-box: fill-box;
  animation: rotating ${BIG_GEAR_WHEEL_SECONDS_PERIOD}s linear infinite;
`;
