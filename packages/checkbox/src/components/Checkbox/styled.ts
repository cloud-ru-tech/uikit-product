import { styled } from '@linaria/react';

import { TEXT_2_STYLES } from '@sbercloud/uikit-product-typography';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const HiddenCheckbox = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  border-style: none;
  z-index: -1;
  opacity: 0;
  margin: 0;
`;

export const CheckboxText = styled.span`
  ${TEXT_2_STYLES};

  &[data-disabled] {
    color: var(${COLORS.DISABLED_TEXT});
  }
`;

export const CheckboxWrap = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  max-width: fit-content;
`;

export const CheckboxTextWrap = styled.span`
  margin-left: 8px;

  &:hover {
    cursor: pointer;

    &[data-disabled] {
      cursor: not-allowed;
    }
  }
`;
