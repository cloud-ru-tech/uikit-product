import { styled } from '@linaria/react';

import { TableText } from '@sbercloud/uikit-typography';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

type SpinProps = {
  side: number;
  thickness: number;
};

export const Spin = styled.div<SpinProps>`
  width: ${props => props.side}px;
  height: ${props => props.side}px;

  box-sizing: border-box;
  display: inline-block;
  border: ${props => props.thickness}px solid var(${COLORS.PRIMARY});
  border-radius: 50%;
  border-top-color: var(${COLORS.SECONDARY});
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes indeterminate {
    0% {
      left: -35%;
      right: 100%;
    }
    60% {
      left: 100%;
      right: -90%;
    }
    100% {
      left: 100%;
      right: -90%;
    }
  }

  @keyframes indeterminate-short {
    0% {
      left: -200%;
      right: 100%;
    }
    60% {
      left: 107%;
      right: -8%;
    }
    100% {
      left: 107%;
      right: -8%;
    }
  }
`;

export const Wrapper = styled.div<{ side: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;
  top: calc(50% - ${props => props.side / 2}px);
`;

export const Text = styled(TableText)<{ padding: number }>`
  color: var(${COLORS.TEXT});
  padding-top: ${props => props.padding}px;
`;
