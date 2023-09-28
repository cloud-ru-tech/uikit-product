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
  flex-direction: column;
  justify-content: flex-start;

  box-sizing: border-box;
  padding: 0 32px;

  &[data-align=${HeaderAlign.Left}] {
    align-items: flex-start;
  }

  &[data-align=${HeaderAlign.Center}] {
    align-items: center;

    text-align: center;
  }
`;

export const TitleWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;

  &[data-align=${HeaderAlign.Left}] {
    margin-right: 40px;
  }
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

export const Subtitle = styled(TruncateString)`
  color: var(${COLORS.subtitle});

  margin-top: 8px;
`;

export const CloseButton = styled(ButtonIconTransparent)`
  position: absolute;
  top: 0px;
  right: 32px;

  overflow: hidden;

  border-radius: 100%;
`;
