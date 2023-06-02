import { styled } from '@linaria/react';

import { CircleCancelFilledInterfaceSVG, SearchInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { EXPORT_VARS } from '@sbercloud/uikit-product-theme';
import { TEXT_2_STYLES, TEXT_3_STYLES } from '@sbercloud/uikit-product-typography';

import { INFO_BOX_SIZE } from './constants';
import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from './themes';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const ListItemWrapper = styled.div`
  &[data-disabled] {
    cursor: not-allowed;
  }
`;

export const LoadingBox = styled.div`
  height: ${INFO_BOX_SIZE}px;
`;

export const ErrorBox = styled(LoadingBox)`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
`;

export const ListItem = styled.div`
  padding: 8px 12px;

  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: start;
  box-sizing: content-box;

  &[data-selected] {
    background-color: var(${COLORS.item.hover.background});
  }

  :hover {
    background-color: var(${COLORS.item.hover.background});
  }

  &[data-disabled] {
    pointer-events: none;

    background-color: unset;
    color: var(${COLORS.item.disabled.color});
  }
`;

export const Text2 = styled.div`
  ${TEXT_2_STYLES};
`;

export const Text3Grey = styled.div`
  ${TEXT_3_STYLES};
  color: var(${EXPORT_VARS.BLACK_ALFA[48]});
`;

export const Text2Red = styled(Text2)`
  color: var(${EXPORT_VARS.BERRY_RED[100]});
`;

export const Text2Grey = styled(Text2)`
  color: var(${EXPORT_VARS.BLACK_ALFA[48]});
`;

export const CircleCancelFilledInterfaceSVGStyled = styled(CircleCancelFilledInterfaceSVG)`
  fill: var(${EXPORT_VARS.BERRY_RED[100]});
`;

export const SearchInterfaceSVGStyled = styled(SearchInterfaceSVG)`
  fill: var(${EXPORT_VARS.BLACK_ALFA[24]});
`;
