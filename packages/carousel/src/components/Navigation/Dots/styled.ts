import { styled } from '@linaria/react';

import { COLORS, DARK_THEMES, LIGHT_THEMES } from './themes';

LIGHT_THEMES;
DARK_THEMES;

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
  background-color: var(${COLORS.dot});

  &[data-active],
  &:hover {
    height: 10px;
    width: 10px;
    margin: 0 11px;
    background-color: var(${COLORS.dotActive});
  }
`;
