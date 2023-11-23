import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { ButtonIconTransparent } from '@sbercloud/uikit-product-button';
import { TruncateString } from '@sbercloud/uikit-product-truncate-string';

import { HeaderAlign } from './constants';
import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

GREEN_THEME;
PURPLE_DARK_THEME;
PURPLE_THEME;
GREEN_DARK_THEME;

export const Wrapper = styled.div`
  position: relative;

  display: flex;

  max-width: 100%;

  box-sizing: border-box;
  padding: 0 32px;
  column-gap: 24px;

  &[data-align=${HeaderAlign.Left}] {
    align-items: flex-start;
  }

  &[data-align=${HeaderAlign.Center}] {
    align-items: center;
    text-align: center;
  }
`;

export const WrapperLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 100%;
  overflow: hidden;
`;

export const TitleWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
`;

export const TitleWithTooltip = styled.div`
  display: flex;
  grid-column-start: 2;
  column-gap: 10px;
  align-items: center;
  overflow: hidden;
`;

export const CloseButtonPlaceholder = styled.div`
  flex-shrink: 0;

  width: 40px;
  height: 1px;

  &[data-align=${HeaderAlign.Left}] {
    display: none;
  }
`;

export const Title = styled(TruncateString)`
  color: var(${COLORS.title});
`;

export const subtitleClassName = css`
  color: var(${COLORS.subtitle});
  margin-top: 8px;
`;

export const CloseButton = styled(ButtonIconTransparent)`
  border-radius: 100%;
`;
