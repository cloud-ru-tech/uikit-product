import { styled } from '@linaria/react';

import { ButtonIcon } from '@sbercloud/uikit-product-button';
import { H5_STYLES, TEXT_2_STYLES } from '@sbercloud/uikit-product-typography';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Wrapper = styled.div`
  display: flex;
  min-width: fit-content;
  border: 1px solid var(${COLORS.border});
  box-sizing: border-box;
  padding: 7px 23px;
  flex-direction: row;
  align-items: center;

  background-color: var(${COLORS.background});
`;

export const Content = styled.div`
  padding: 0 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  color: var(${COLORS.text});
`;

export const Title = styled.span`
  ${H5_STYLES};
`;

export const Description = styled.span`
  ${TEXT_2_STYLES};
`;

export const CloseButton = styled(ButtonIcon)`
  margin-left: 12px;
`;
