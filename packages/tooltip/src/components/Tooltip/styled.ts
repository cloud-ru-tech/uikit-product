import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-theme';

const { COLORS_TOOLTIP } = DEPRECATED_EXPORT_VARS;

export const containerClassName = css`
  z-index: 99999;
  max-width: 265px;
  max-height: 220px;
  overflow-x: hidden;
  overflow-y: auto;
  box-sizing: border-box;

  border: none;
  color: var(${COLORS_TOOLTIP.CONTAINER_COLOR});
  background-color: var(${COLORS_TOOLTIP.CONTAINER_BG});
  border-radius: 4px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  padding: 8px 12px;
  font-size: 14px;
  line-height: 20px;
`;

export const containerWithIconClassName = css`
  padding-right: 44px;
`;

export const TooltipWrapper = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  white-space: pre-wrap;
`;

export const IconWrapper = styled.span`
  position: absolute;
  top: 8px;
  right: 8px;
  fill: var(${COLORS_TOOLTIP.ICON_FILL});

  &[data-action='true'] {
    cursor: pointer;

    &:focus,
    &:hover {
      fill: var(${COLORS_TOOLTIP.ICON_HOVER_FILL});
    }
  }
`;

export const triggerClassName = css`
  display: inline-block;
  cursor: pointer;
`;
