import { styled } from '@linaria/react';

import { EXPORT_VARS } from '@sbercloud/uikit-theme';

export const FastFilter = styled.div`
  display: flex;
  align-items: center;
  border-radius: 4px;
  margin: 8px 0;
  padding: 8px 12px;
  cursor: pointer;
  fill: var(${EXPORT_VARS.GREY[200]});

  &[data-active] {
    background-color: var(${EXPORT_VARS.BLACK_ALFA[4]});
  }

  &:hover {
    background-color: var(${EXPORT_VARS.BLACK_ALFA[4]});
    fill: var(${EXPORT_VARS.PURPLE[100]});
    color: var(${EXPORT_VARS.PURPLE[100]});
  }
`;

export const IconWrap = styled.div`
  margin-right: 12px;
`;

export const FiltersBlock = styled.div`
  margin-bottom: 24px;
`;
