import { ReactElement } from 'react';

import { BaseItemProps } from '@snack-uikit/list';

export type Item = {
  id: string;
  name: string;
  logo?: ReactElement;
  onEdit?(): void;
  actions?: BaseItemProps[];
};

export type ItemsGroup<T> = {
  id: string;
  heading?: string;
  items: T[];
};
