import { styled } from '@linaria/react';

import { Button } from '@sbercloud/uikit-product-button';
import { EXPORT_VARS } from '@sbercloud/uikit-product-theme';
import { TEXT_1_STYLES } from '@sbercloud/uikit-product-typography';

export const FilterWrap = styled.div`
  width: 240px;
  border-radius: 8px;
  padding: 16px;
  background-color: var(${EXPORT_VARS.GREY[0]});
`;

export const FiltersBlock = styled.div`
  &:not(:last-child) {
    margin-bottom: 24px;
  }
`;

export const Title = styled.span`
  ${TEXT_1_STYLES};
  display: inline-block;
  font-weight: 600;
  margin-bottom: 16px;
`;

export const FilterOptions = styled.div``;

export const StyledButton = styled(Button)`
  display: flex;
  width: 100% !important;
`;
