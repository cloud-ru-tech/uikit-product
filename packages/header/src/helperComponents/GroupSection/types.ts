import { ReactElement } from 'react';

export type Item = {
  id: string;
  name: string;
  logo?: ReactElement;
  onEdit?(): void;
};

export type ItemsGroup<T> = {
  id: string;
  heading?: string;
  items: T[];
};
