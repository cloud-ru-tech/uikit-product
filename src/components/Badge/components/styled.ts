import { styled } from '@linaria/react';

import { COLORS_BADGE } from 'theme/color/vars';

export const BadgeStyled = styled.span`
  display: inline-flex;
  position: relative;
`;

export const BadgeItemStyled = styled.span<{ color?: string }>`
  display: inline-block;
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
  transform-origin: 100% 0;
  box-sizing: border-box;
  border-radius: 20px;
  padding: 1px 4px;
  font-size: 11px;
  line-height: 12px;
  color: var(${COLORS_BADGE.TEXT_COLOR});
  background-color: ${({ color }) =>
    color || `var(${COLORS_BADGE.DEFAULT_BACKGROUND})`};
  border: 1px solid var(${COLORS_BADGE.BORDER_COLOR});
`;
