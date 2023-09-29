import eq from 'lodash.eq';
import gt from 'lodash.gt';
import gte from 'lodash.gte';
import lt from 'lodash.lt';
import lte from 'lodash.lte';

import { OptionTypeBase } from '@sbercloud/uikit-product-select';
import { LanguageCodeType } from '@sbercloud/uikit-product-utils';

import { textProvider, Texts } from './texts-provider';

type neqType = Parameters<typeof eq>;

export type IOperationsType = {
  eq: typeof eq;
  neq: typeof eq;
  gt: typeof gt;
  gte: typeof gte;
  lt: typeof lt;
  lte: typeof lte;
  include: (value: unknown[], other: unknown) => boolean;
  noinclude: (value: unknown[], other: unknown) => boolean;
};

export enum LogicConditionType {
  Eq = 'eq',
  Neq = 'neq',
  Lt = 'lt',
  Lte = 'lte',
  Gt = 'gt',
  Gte = 'gte',
  Include = 'include',
  Noinclude = 'noinclude',
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

export type LogicOptionType = {
  value: LogicConditionType;
  label: string;
};

export const logicOptions = (language: LanguageCodeType): LogicOptionType[] => [
  {
    value: LogicConditionType.Include,
    label: textProvider(language, Texts.Include),
  },
  {
    value: LogicConditionType.Noinclude,
    label: textProvider(language, Texts.NoInclude),
  },
  {
    value: LogicConditionType.Eq,
    label: textProvider(language, Texts.Eq),
  },
  {
    value: LogicConditionType.Neq,
    label: textProvider(language, Texts.Neq),
  },
  {
    value: LogicConditionType.Lt,
    label: textProvider(language, Texts.Lt),
  },
  {
    value: LogicConditionType.Lte,
    label: textProvider(language, Texts.Lte),
  },
  {
    value: LogicConditionType.Gt,
    label: textProvider(language, Texts.Gt),
  },
  {
    value: LogicConditionType.Gte,
    label: textProvider(language, Texts.Gte),
  },
];

export const getLogicOptionByValue = (language: LanguageCodeType) =>
  logicOptions(language).reduce(
    (acc, curr) => {
      acc[curr.value] = curr;
      return acc;
    },
    {} as { [key: string]: OptionTypeBase },
  );
