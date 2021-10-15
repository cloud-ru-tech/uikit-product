import { styled } from '@linaria/react';

import { Button } from '@sbercloud/uikit-react-button';
import { EXPORT_VARS } from '@sbercloud/uikit-theme';
import { Text1 } from '@sbercloud/uikit-typography';

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

export const Title = styled(Text1)`
  display: inline-block;
  font-weight: 600;
  margin-bottom: 16px;
`;

export const FilterOptions = styled.div``;

export const StyledButton = styled(Button)`
  display: flex;
  width: 100% !important;
`;
