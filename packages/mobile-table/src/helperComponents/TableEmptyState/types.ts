import { ReactNode } from 'react';

import { IconPredefinedProps } from '@snack-uikit/icon-predefined';

export type EmptyStateProps = {
  title?: string;
  description?: string;
  icon?: Pick<IconPredefinedProps, 'icon' | 'decor' | 'appearance'>;
  footer?: ReactNode;
  className?: string;
};
