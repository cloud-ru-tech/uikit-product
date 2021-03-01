import { styled } from '@linaria/react';
import { COLORS, COLORS_GENERAL } from 'theme/color/vars';


export type TTextProps = {
  color?: string;
};

export const Text_1 = styled.span<TTextProps>`
  color: ${props => props.color || `var(${COLORS_GENERAL.TEXT})`};
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  margin: 0;
`;

export const Text_2 = styled.span<TTextProps>`
  color: ${props => props.color || `var(${COLORS_GENERAL.TEXT})`};
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  margin: 0;
`;

export const Text_2_Link = styled.span<TTextProps>`
  color: ${props => props.color || `var(${COLORS.VIOLET_5})`};
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  margin: 0;
`;

export const Text_3 = styled.span<TTextProps>`
  color: ${props => props.color || `var(${COLORS_GENERAL.TEXT})`};
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  margin: 0;
`;

export const Text_4 = styled.span<TTextProps>`
  color: ${props => props.color || `var(${COLORS_GENERAL.TEXT})`};
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 15px;
  margin: 0;
`;
