import { styled } from '@linaria/react';

import { EXPORT_VARS } from '@sbercloud/uikit-theme';

export const DotsWrap = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Dot = styled.div`
  height: 8px;
  width: 8px;
  margin: 0 12px;
  border-radius: 50%;
  cursor: pointer;
  background-color: var(${EXPORT_VARS.BLACK_ALFA['16']});

  &[data-active],
  &:hover {
    height: 10px;
    width: 10px;
    margin: 0 11px;
    background-color: var(${EXPORT_VARS.PURPLE['100']});
  }
`;
