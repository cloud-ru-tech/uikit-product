import { styled } from '@linaria/react';
import { COLORS_GENERAL } from 'theme/color/vars';

export type TFontProps = {
  color?: string;
};

export const H1 = styled.h1<TFontProps>`
  color: ${props => props.color || `var(${COLORS_GENERAL.TEXT})`};
  font-style: normal;
  font-weight: normal;
  font-size: 44px;
  line-height: 44px;
  margin: 0;
`;

export const H2 = styled.h2<TFontProps>`
  color: ${props => props.color || `var(${COLORS_GENERAL.TEXT})`};
  font-style: normal;
  font-weight: normal;
  font-size: 32px;
  line-height: 40px;
  margin: 0;
`;

export const H3 = styled.h3<TFontProps>`
  color: ${props => props.color || `var(${COLORS_GENERAL.TEXT})`};
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 26px;
  margin: 0;
`;

export const H3Semibold = styled.h3<TFontProps>`
  color: ${props => props.color || `var(${COLORS_GENERAL.TEXT})`};
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 26px;
  margin: 0;
`;

export const H4 = styled.h4<TFontProps>`
  color: ${props => props.color || `var(${COLORS_GENERAL.TEXT})`};
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  margin: 0;
`;

export const H5 = styled.h5<TFontProps>`
  color: ${props => props.color || `var(${COLORS_GENERAL.TEXT})`};
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  margin: 0;
`;
