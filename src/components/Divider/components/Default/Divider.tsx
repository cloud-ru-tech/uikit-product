import { styled } from '@linaria/react';
import { COLORS_DIVIDER } from 'theme/color/vars';

type TStyleProps = {
  color: string;
};

export type TDividerProps = {
  color?: 'light' | 'middle' | 'dark' | string;
  style?: React.CSSProperties;
};

const DividerWithStyle = styled.hr<TStyleProps>`
  border: none;
  color: ${props => props.color};
  background: ${props => props.color};
  height: 1px;
`;

const DEFAULT_COLOR: { [key: string]: string } = {
  light: `var(${COLORS_DIVIDER.COLOR_LIGHT})`,
  middle: `var(${COLORS_DIVIDER.COLOR_MIDDLE})`,
  dark: `var(${COLORS_DIVIDER.COLOR_DARK})`,
};

export const Divider: React.FC<TDividerProps> = ({
  color = 'light',
  style,
}) => <DividerWithStyle color={DEFAULT_COLOR[color] || color} style={style} />;
