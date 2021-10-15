import { ReactElement, ReactText } from 'react';

import { FilterTypes } from './constants';

export type FilterItem = {
  name: string;
  amount?: number;
  id: ReactText;
};

export type FastFilters = {
  icon: ReactElement;
  name: string;
  id: ReactText;
}[];

export type Filters = {
  title: string;
  type: FilterTypes;
  items: FilterItem[];
  id: ReactText;
}[];
