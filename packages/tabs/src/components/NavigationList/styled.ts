import { styled } from '@linaria/react';

import { DEFAULT_STYLES } from '@sbercloud/uikit-utils';

import { Sizes } from '../../helpers/types';

export const GroupStyled = styled.ul`
  ${DEFAULT_STYLES.COMMON};
  box-sizing: content-box;

  list-style: none;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  flex-shrink: 0;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  position: relative;

  & > * + * {
    margin-left: 24px;
  }

  &[data-size='${Sizes.Medium}'] {
    padding-bottom: 8px;
  }

  &[data-size='${Sizes.Large}'] {
    padding-bottom: 16px;
  }
`;

export const RelContainer = styled.nav`
  position: relative;
  overflow: hidden;
`;
