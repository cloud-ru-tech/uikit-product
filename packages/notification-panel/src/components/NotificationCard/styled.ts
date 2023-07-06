import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { MoreInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { H5_STYLES, TEXT_3_STYLES } from '@sbercloud/uikit-product-typography';
import { ANIMATIONS } from '@sbercloud/uikit-product-utils';

import { CardType } from '../../types';
import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Wrapper = styled.div`
  width: 100%;
  position: relative;
  background-color: var(${COLORS.background.default});
  border-radius: 8px;
  padding: 16px;
  box-sizing: border-box;
  transition: background-color ${ANIMATIONS.TRANSITION};

  &[data-type=${CardType.Alarm}] {
    background-color: var(${COLORS.background.alarm});
  }

  &[data-clickable] {
    cursor: pointer;

    &:hover {
      background-color: var(${COLORS.background.hover.default});

      &[data-type=${CardType.Alarm}] {
        background-color: var(${COLORS.background.hover.alarm});
      }
    }
  }
`;

export const Badge = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 100%;
  background-color: var(${COLORS.badge});
  position: absolute;
  top: 8px;
  right: 8px;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const HeaderLeftSide = styled.div`
  ${TEXT_3_STYLES};
  display: flex;
  align-items: center;
  color: var(${COLORS.header.breadcrumbs});
  gap: 4px;
`;

export const HeaderRightSide = styled.div`
  display: flex;
  align-items: center;
`;

export const HeaderIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  height: 24px;
  width: 24px;
  background-color: var(${COLORS.header.icon.background});
  fill: var(${COLORS.header.icon.fill});
`;

export const DropdownMenuButtonIconView = css`
  display: none;

  &[data-visible] {
    display: block;
  }
`;

export const Time = styled.div`
  ${TEXT_3_STYLES};
  color: var(${COLORS.header.time});
  display: none;
  opacity: 0;

  &[data-visible] {
    display: block;
    opacity: 1;
  }
`;

export const MoreIcon = styled(MoreInterfaceSVG)`
  fill: var(${COLORS.header.moreIcon});
`;

export const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
`;

export const ContentLeftSide = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContentRightSide = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

export const ContentTitle = styled.div`
  ${H5_STYLES};
  display: flex;
  align-items: center;
  margin-bottom: 6px;
  color: var(${COLORS.content.title});
  gap: 2px;
`;

export const ContentDescription = styled.span`
  ${TEXT_3_STYLES};
  margin-bottom: 10px;
  color: var(${COLORS.content.description});
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  gap: 8px;
`;
