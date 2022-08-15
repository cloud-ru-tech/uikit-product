import { styled } from '@linaria/react';

import { SearchInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { InputPrivate } from '@sbercloud/uikit-product-input-private';

import { Size } from './constants';
import { COLORS, DARK_THEMES, LIGHT_THEMES } from './themes';

LIGHT_THEMES;
DARK_THEMES;

export const SearchWrapper = styled.div`
  box-sizing: border-box;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  border: 1px solid transparent;

  &[data-size=${Size.ExtraLarge}] {
    height: 52px;
    padding: 16px;
  }

  &[data-size=${Size.Large}] {
    height: 44px;
    padding: 12px;
  }

  &[data-size=${Size.Medium}] {
    height: 36px;
    padding: 8px 12px;
  }

  &[data-size=${Size.Small}] {
    height: 28px;
    padding: 4px 8px;
  }

  &[data-filled] {
    background: var(${COLORS.background.default});

    &[data-disabled] {
      background: var(${COLORS.background.disabled});
    }
  }

  &[data-stroke] {
    border-color: var(${COLORS.border.default});

    &[data-disabled] {
      border-color: var(${COLORS.border.disabled});
    }
  }
`;

export const SearchIcon = styled(SearchInterfaceSVG)`
  flex-shrink: 0;
  fill: var(${COLORS.icon.default});

  &[data-disabled] {
    fill: var(${COLORS.icon.disabled});
  }
`;

export const Input = styled(InputPrivate)`
  &::placeholder {
    color: var(${COLORS.placeholder.default});
  }

  &[disabled]::placeholder {
    color: var(${COLORS.placeholder.disabled});
  }
`;
