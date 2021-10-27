import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const TagsWrap = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin-bottom: 0;
  height: 28px;
`;

export const tagClassName = css`
  display: flex;
  font-size: 14px;
  line-height: 20px;
  flex-direction: row;
  align-items: center;
  margin: 0 8px 8px 0;
  height: 28px;
  box-sizing: border-box;
  flex-shrink: 0;
  width: fit-content;
  padding: 0 8px;

  &:last-child {
    margin-right: 0;
  }
`;

export const triggerTagClassName = css`
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: 8px;
  max-width: 40px;

  &:hover {
    background: var(${COLORS.TRIGGER_TAG_HOVER});
  }
`;

export const Tags = styled.div`
  display: flex;
  overflow: hidden;
  width: 100%;
  max-width: 100%;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;

  &[data-hidden='true'] {
    visibility: hidden;
  }
`;

export const tooltipTriggerClassName = css`
  display: flex;
  align-items: center;
  height: 28px;
  box-sizing: border-box;
  flex-shrink: 0;
`;

export const tooltipContainerClassName = css`
  background-color: var(${COLORS.TOOLTIP_CONTAINER_BACKGROUND});
  max-width: 200px;
  min-width: 200px;
  max-height: 256px;
  padding: 12px 4px 4px 12px;
  box-sizing: border-box;
  overflow: scroll;
  box-shadow: 0 4px 20px var(${COLORS.TOOLTIP_CONTAINER_BOX_SHADOW});
`;

export const TooltipContent = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-height: 100%;
  max-width: 100%;
  height: 100%;
  width: 100%;
  overflow: scroll;
`;
