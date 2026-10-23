import { DroplistProps } from '@snack-uikit/list';

import { FieldType } from '../../../../types';

export type DropListItem = DroplistProps['items'][number];

export type DropListItemSpark = DropListItem & {
  id: string;
  inn: string;
  company: string;
};

export type FieldTypeInnCompany = Extract<FieldType, 'inn' | 'company'>;
