import { styled } from '@linaria/react';
import { COLORS_GENERAL } from 'theme/color/vars';

export type TTableProps = {
  color?: string;
};

export const TableText = styled.span<TTableProps>`
  color: ${props => props.color || `var(${COLORS_GENERAL.TEXT})`};
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  margin: 0;
`;
