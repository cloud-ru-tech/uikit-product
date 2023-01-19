import { ReactElement, ReactText } from 'react';

import { FilterTypes } from './constants';

export type FilterItem = {
  name: string;
  amount?: number;
  id: string;
};

export type FastFilters = {
  icon: ReactElement;
  name: string;
  id: string;
}[];

export type Filters = {
  title: string;
  type: FilterTypes;
  items: FilterItem[];
  id: ReactText;
}[];
