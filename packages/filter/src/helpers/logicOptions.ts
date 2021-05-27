import eq from 'lodash.eq';
import gt from 'lodash.gt';
import gte from 'lodash.gte';
import lt from 'lodash.lt';
import lte from 'lodash.lte';

import { OptionTypeBase } from '@sbercloud/uikit-react-select';

type neqType = Parameters<typeof eq>;

export interface IOperationsType {
  eq: typeof eq;
  neq: typeof eq;
  gt: typeof gt;
  gte: typeof gte;
  lt: typeof lt;
  lte: typeof lte;
  include: (value: unknown[], other: unknown) => boolean;
  noinclude: (value: unknown[], other: unknown) => boolean;
}

export const logicOperations: IOperationsType = {
  eq,
  neq: (...rest: neqType): boolean => !eq(...rest),
  gt,
  gte,
  lt,
  lte,
  include: (value, other) => value.includes(other),
  noinclude: (value, other) => !value.includes(other),
};

export const logicOptions = [
  {
    value: 'include',
    label: 'Содержит',
  },
  {
    value: 'noinclude',
    label: 'Не содержит',
  },
  {
    value: 'eq',
    label: 'Равно',
  },
  {
    value: 'neq',
    label: 'Не равно',
  },
  {
    value: 'lt',
    label: 'Меньше чем',
  },
  {
    value: 'lte',
    label: 'Меньше чем или равно',
  },
  {
    value: 'gt',
    label: 'Больше чем',
  },
  {
    value: 'gte',
    label: 'Больше чем или равно',
  },
];

export const logicOptionByValue = logicOptions.reduce((acc, curr) => {
  acc[curr.value] = curr;
  return acc;
}, {} as { [key: string]: OptionTypeBase });

export type LogicConditionType = 'eq' | 'neq' | 'lt' | 'lte' | 'gt' | 'gte' | 'include' | 'noinclude';
