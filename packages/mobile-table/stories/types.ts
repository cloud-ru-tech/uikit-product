import { ChipChoiceTimeProps } from '@snack-uikit/chips';

export type StubData = {
  // status: string;
  col1: number;
  col2: number;
  col3: number;
  col4: number;
  col5: number;
  col6: number;
  date: number;
};

export type Filters = {
  single: string;
  multiple: string[];
  date: Date;
  time: ChipChoiceTimeProps['value'];
};
