import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-theme';
import { H5, Text3 } from '@sbercloud/uikit-typography';

const { COLORS_TOAST } = DEPRECATED_EXPORT_VARS;

export const progressClassName = css`
  animation: spin 0.7s infinite steps(8);

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const ResetButton = styled.button`
  padding: 0;
  border: none;
  font: inherit;
  color: inherit;
  background-color: transparent;
  cursor: pointer;
  outline: none;
`;

export const Close = styled(ResetButton)`
  position: absolute;
  top: 12px;
  right: 12px;
`;

export const StyledIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  flex: 0 0 40px;
  height: 40px;

  margin-right: 16px;
  border-radius: 8px;
`;

export const Title = styled(H5)``;

export const Subtitle = styled(Text3)`
  display: block;
  margin-top: 4px;
`;

export const Text = styled(Text3)`
  display: block;
  margin-top: 4px;
`;

export const Actions = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  grid-column-gap: 8px;
  margin-top: 8px;
`;

export const ActionText = styled(Text3)``;

export const Action = styled(ResetButton)``;

export const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;

  cursor: default;
  padding: 16px 28px 16px 16px;

  &[data-variant='info'] {
    background-color: var(${COLORS_TOAST.INFO_BG});
    color: var(${COLORS_TOAST.INFO_COLOR});
    fill: var(${COLORS_TOAST.INFO_COLOR});

    ${StyledIcon} {
      background-color: var(${COLORS_TOAST.INFO_ICON_BG});
    }

    ${Title},
    ${Text} {
      color: var(${COLORS_TOAST.INFO_COLOR});
    }

    ${Subtitle} {
      color: var(${COLORS_TOAST.INFO_SECONDARY_COLOR});
    }

    ${Close},
    ${ActionText} {
      color: var(${COLORS_TOAST.INFO_ACTION_COLOR});
      fill: var(${COLORS_TOAST.INFO_ACTION_COLOR});

      &:hover {
        color: var(${COLORS_TOAST.INFO_ACTION_HOVER_COLOR});
        fill: var(${COLORS_TOAST.INFO_ACTION_HOVER_COLOR});
      }
    }
  }

  &[data-variant='error'] {
    background-color: var(${COLORS_TOAST.ERROR_BG});
    color: var(${COLORS_TOAST.ERROR_COLOR});
    fill: var(${COLORS_TOAST.ERROR_COLOR});

    ${StyledIcon} {
      background-color: var(${COLORS_TOAST.INFO_ICON_BG});
    }

    ${Title},
    ${Text} {
      color: var(${COLORS_TOAST.ERROR_COLOR});
    }

    ${Subtitle} {
      color: var(${COLORS_TOAST.ERROR_SECONDARY_COLOR});
    }

    ${Close},
    ${ActionText} {
      color: var(${COLORS_TOAST.ERROR_ACTION_COLOR});
      fill: var(${COLORS_TOAST.ERROR_ACTION_COLOR});

      &:hover {
        color: var(${COLORS_TOAST.ERROR_ACTION_HOVER_COLOR});
        fill: var(${COLORS_TOAST.ERROR_ACTION_HOVER_COLOR});
      }
    }
  }
`;

export const Content = styled.div`
  overflow: hidden;
  word-wrap: break-word;
`;
