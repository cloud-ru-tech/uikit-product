import { styled } from '@linaria/react';

import { GLOBAL_CSS_COLOR } from '@sbercloud/uikit-theme';

export const Wrapper = styled.div`
  padding: 20px;
  background-color: var(${GLOBAL_CSS_COLOR.BACKGROUND_SECONDARY});
`;

export const Columns = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 40px;
`;

export const Title = styled.div`
  margin-bottom: 10px;
  width: 100%;
`;

export const StyledColumn = styled.div`
  max-width: 30%;
  flex-basis: 30%;

  &:not(:last-of-type) {
    padding-right: 50px;
  }
`;

export const ItemWrap = styled.div`
  margin-top: 20px;
  padding-bottom: 10px;
`;
