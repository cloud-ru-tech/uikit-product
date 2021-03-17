import { COLORS_DIVIDER } from 'theme/color/vars';

import { StyledDivider } from './styled';

export interface IDividerProps {
  color?: 'light' | 'middle' | 'dark' | string;
  style?: React.CSSProperties;
}

const DEFAULT_COLOR: { [key: string]: string } = {
  light: `var(${COLORS_DIVIDER.COLOR_LIGHT})`,
  middle: `var(${COLORS_DIVIDER.COLOR_MIDDLE})`,
  dark: `var(${COLORS_DIVIDER.COLOR_DARK})`,
};

export const Divider: React.FC<IDividerProps> = ({
  color = 'light',
  style,
}) => <StyledDivider color={DEFAULT_COLOR[color] || color} style={style} />;
