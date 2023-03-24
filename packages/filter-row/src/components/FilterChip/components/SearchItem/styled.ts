import { styled } from '@linaria/react';

import { Search as SearchInner } from '@sbercloud/uikit-product-search';

export const SearchItemContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Search = styled(SearchInner)`
  padding: 0;
  width: 100%;
  margin: 0;
`;
