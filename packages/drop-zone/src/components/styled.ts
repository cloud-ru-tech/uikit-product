import { styled } from '@linaria/react';

import { EXPORT_VARS } from '@sbercloud/uikit-product-theme';
import { H4_STYLES, TEXT_2_STYLES } from '@sbercloud/uikit-product-typography';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border: 2px dashed var(${EXPORT_VARS.GREY[200]});
  border-radius: 8px;
  transition: border-color 0.2s ease, background-color 0.2s ease;
  cursor: pointer;

  &:hover {
    border-color: var(${COLORS.BORDER_HOVER});
  }

  &[data-over] {
    border-color: var(${COLORS.BORDER_HOVER});
    background-color: var(${COLORS.BACKGROUND_HOVER});
  }
`;

export const Header = styled.div`
  text-align: center;
`;

export const H4Styled = styled.span`
  ${H4_STYLES};
`;

export const Description = styled.span`
  ${TEXT_2_STYLES};

  color: var(${COLORS.CONTENT});
`;

export const HiddenInput = styled.input`
  display: none;
`;
