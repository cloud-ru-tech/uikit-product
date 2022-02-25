import { CSSProperties, ReactNode } from 'react';

import { PresetColorType, Types } from './constants';

export type TagProps = {
  value?: string;
  type?: Types;
  className?: string;
  children?: ReactNode;
  style?: CSSProperties;
  color?: PresetColorType | string;
};
