import { styled } from '@linaria/react';

import { SearchInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { TEXT_2_STYLES } from '@sbercloud/uikit-product-typography';

import { COLORS, DARK_THEMES, LIGHT_THEMES } from './themes';

LIGHT_THEMES;
DARK_THEMES;

export const Wrapper = styled.div`
  grid-area: header-project-selector;
  margin-right: 8px;

  &[data-mobile] {
    margin: 8px 16px;
  }
`;

export const List = styled.ul`
  margin: 0;
  padding: 0;
`;

export const NoDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 16px;
  gap: 4px;
`;

export const NoDataLabel = styled.div`
  ${TEXT_2_STYLES};

  color: var(${COLORS.noDataLabel});
`;

export const SearchIcon = styled(SearchInterfaceSVG)`
  flex-shrink: 0;
  fill: var(${COLORS.searchIconFill});
`;
