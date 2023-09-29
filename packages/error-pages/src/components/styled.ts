import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { BlockBasic } from '@sbercloud/uikit-product-layout';
import { PredefinedCloudLogo, PredefinedMLSpaceLogo } from '@sbercloud/uikit-product-predefined-icons-private';
import { H1_STYLES, H2_STYLES, TEXT_1_STYLES, TEXT_2_STYLES } from '@sbercloud/uikit-product-typography';
import { CSS_BREAKPOINTS } from '@sbercloud/uikit-product-utils';

const GEAR_WHEEL_ROTATION_PERIOD = 10;

export const Wrapper = styled(BlockBasic)`
  height: 100%;
  border-radius: 8px;
  box-sizing: border-box;
  padding: 48px;
  gap: 48px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media ${CSS_BREAKPOINTS.mobile} {
    padding: 24px;
    gap: 24px;
  }
`;

export const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media ${CSS_BREAKPOINTS.mobile} {
    height: 100%;
    justify-content: space-between;
  }
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const CloudLogo = styled(PredefinedCloudLogo)`
  margin-bottom: 24px;
`;

export const MlSpaceLogo = styled(PredefinedMLSpaceLogo)`
  margin-bottom: 24px;
`;

export const Title = styled.h1`
  ${H1_STYLES};

  @media ${CSS_BREAKPOINTS.mobile} {
    ${H2_STYLES};
  }
`;

export const ActionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ActionTitle = styled.div`
  ${TEXT_1_STYLES};

  @media ${CSS_BREAKPOINTS.mobile} {
    ${TEXT_2_STYLES};
  }
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

  * > path {
    fill: currentColor;
  }

  @media ${CSS_BREAKPOINTS.mobile} {
    flex-direction: column;
  }
`;

export const RightSide = styled.div`
  align-self: flex-end;
  justify-self: center;
  width: 50%;
  min-width: 500px;
  max-width: 862px;
  min-height: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;

  @media ${CSS_BREAKPOINTS.tablet} {
    justify-content: flex-start;
    align-items: center;
    min-width: 0;
    max-width: none;
    width: 100%;
  }

  @media ${CSS_BREAKPOINTS.mobile} {
    display: none;
  }
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
  animation: rotating ${GEAR_WHEEL_ROTATION_PERIOD}s linear infinite;
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
  animation: rotating ${GEAR_WHEEL_ROTATION_PERIOD}s linear infinite;
`;

export const buttonClassName = css`
  @media ${CSS_BREAKPOINTS.mobile} {
    width: 100%;
  }
`;

export const picClassName = css`
  max-width: 863px;
  max-height: 520px;

  @media ${CSS_BREAKPOINTS.tablet} {
    max-height: 100%;
    max-width: 100%;
  }
`;
