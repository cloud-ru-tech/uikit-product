import { ReactElement } from 'react';

import { BaseItemProps } from '@snack-uikit/list';

export type Item = {
  id: string;
  name: string;
  logo?: ReactElement;
  tag?: ReactElement;
  onEdit?(): void;
  actions?: BaseItemProps[];
  new?: boolean;
  partner?: boolean;
};

export type ItemsGroup<T> = {
  id: string;
  heading?: string;
  items: T[];
  hidden?: boolean;
};
