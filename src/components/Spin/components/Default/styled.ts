import { styled } from '@linaria/react';
import { COLORS_SPIN } from 'theme/color/vars';
import { css } from '@linaria/core';

type ISpinnerProps = {
  size: number;
  borderSize: number;
};

export const Spinner = styled.div<ISpinnerProps>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;

  display: inline-block;
  border: ${props => props.borderSize}px solid var(${COLORS_SPIN.BORDER});
  border-radius: 50%;
  border-top-color: var(${COLORS_SPIN.BORDER_TOP});
  animation: spin 1s ease-in-out infinite;

  &[data-reverse='true'] {
    border: ${props => props.borderSize}px solid var(${COLORS_SPIN.BORDER_REV});
    border-top-color: var(${COLORS_SPIN.BORDER_REV_TOP});
  }
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

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const textCSS = css`
  margin-top: 20px !important;
  color: var(${COLORS_SPIN.TEXT_COLOR}) !important;
  &[data-reverse='true'] {
    color: var(${COLORS_SPIN.TEXT_REV_COLOR}) !important;
  }
`;
