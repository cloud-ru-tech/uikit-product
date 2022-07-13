import { styled } from '@linaria/react';

import { EXPORT_VARS } from '@sbercloud/uikit-product-theme';
import { TooltipMenuItemPrivate } from '@sbercloud/uikit-product-tooltip-private';
import { TEXT_3_STYLES } from '@sbercloud/uikit-product-typography';

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  grid-area: header-menu;
  margin-right: 16px;
`;

export const Item = styled.li`
  list-style-type: none;
`;

export const Title = styled(TooltipMenuItemPrivate)`
  ${TEXT_3_STYLES};

  color: var(${EXPORT_VARS.GREY[350]});
  cursor: default;
  height: 24px;
`;
