import { LanguageCodeType } from '@sbercloud/uikit-utils';
import { OptionTypeBase } from '@sbercloud/uikit-react-select';
import eq from 'lodash.eq';
import gt from 'lodash.gt';
import gte from 'lodash.gte';
import lt from 'lodash.lt';
import lte from 'lodash.lte';

import { Texts, textProvider } from '../helpers/texts-provider';

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

export const logicOptions = (language: LanguageCodeType) => [
  {
    value: 'include',
    label: textProvider(language, Texts.include),
  },
  {
    value: 'noinclude',
    label: textProvider(language, Texts.noInclude),
  },
  {
    value: 'eq',
    label: textProvider(language, Texts.eq),
  },
  {
    value: 'neq',
    label: textProvider(language, Texts.neq),
  },
  {
    value: 'lt',
    label: textProvider(language, Texts.lt),
  },
  {
    value: 'lte',
    label: textProvider(language, Texts.lte),
  },
  {
    value: 'gt',
    label: textProvider(language, Texts.gt),
  },
  {
    value: 'gte',
    label: textProvider(language, Texts.gte),
  },
];

export const getLogicOptionByValue = (language: LanguageCodeType) =>
  logicOptions(language).reduce((acc, curr) => {
    acc[curr.value] = curr;
    return acc;
  }, {} as { [key: string]: OptionTypeBase });

export type LogicConditionType = 'eq' | 'neq' | 'lt' | 'lte' | 'gt' | 'gte' | 'include' | 'noinclude';
