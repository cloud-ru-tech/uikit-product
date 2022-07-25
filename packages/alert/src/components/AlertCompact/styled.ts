import { styled } from '@linaria/react';

import { Link as StylelessLink } from '@sbercloud/uikit-product-link';
import { TEXT_2_STYLES } from '@sbercloud/uikit-product-typography';

import { AlertCompact } from './AlertCompact';
import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

export const Highlighter = styled.div`
  border-width: 2px;
  border-radius: 4px;
  border-style: solid;

  &[data-type='${AlertCompact.types.Default}'] {
    border-color: var(${COLORS.highlighter.default});
    background-color: var(${COLORS.highlighter.default});
  }

  &[data-type='${AlertCompact.types.Attention}'] {
    border-color: var(${COLORS.highlighter.attention});
    background-color: var(${COLORS.highlighter.attention});
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 12px;
  ${TEXT_2_STYLES};
  color: var(${COLORS.text});
`;

export const Description = styled.span``;

export const Link = styled(StylelessLink)`
  padding-top: 8px;
`;
