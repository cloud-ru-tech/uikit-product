import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-theme';

import { StyledDivider } from './styled';

const { COLORS_DIVIDER } = DEPRECATED_EXPORT_VARS;

export type DividerProps = {
  color?: 'light' | 'middle' | 'dark' | string;
  style?: React.CSSProperties;
  className?: string;
};

const DEFAULT_COLOR: { [key: string]: string } = {
  light: `var(${COLORS_DIVIDER.COLOR_LIGHT})`,
  middle: `var(${COLORS_DIVIDER.COLOR_MIDDLE})`,
  dark: `var(${COLORS_DIVIDER.COLOR_DARK})`,
};

export const Divider: React.FC<DividerProps> = ({ color = 'light', style, className }) => (
  <StyledDivider color={DEFAULT_COLOR[color] || color} style={style} className={className} />
);
