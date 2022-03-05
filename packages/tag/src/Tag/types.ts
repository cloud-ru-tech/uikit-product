import { CSSProperties, ReactNode } from 'react';

import { Colors, Types } from './constants';

export type TagProps = {
  value?: string;
  type?: Types;
  className?: string;
  children?: ReactNode;
  style?: CSSProperties;
  color?: Colors | string;
};
