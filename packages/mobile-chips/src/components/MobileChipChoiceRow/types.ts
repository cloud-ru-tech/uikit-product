import { ValueOf } from '@snack-uikit/utils';

import {
  MobileChipChoiceCustomProps,
  MobileChipChoiceDateProps,
  MobileChipChoiceDateRangeProps,
  MobileChipChoiceTimeProps,
} from '../MobileChipChoice/components';
import { CHIP_CHOICE_TYPE } from '../MobileChipChoice/constants';
import { MobileChipChoiceMultipleProps, MobileChipChoiceSingleProps } from '../MobileChipChoice/types';
import { CHIP_CHOICE_ROW_SIZE } from './constants';

export type ChipChoiceRowSize = ValueOf<typeof CHIP_CHOICE_ROW_SIZE>;

type ChipChoiceMultipleType = {
  type: typeof CHIP_CHOICE_TYPE.Multiple;
} & MobileChipChoiceMultipleProps;

type ChipChoiceSingleType = {
  type: typeof CHIP_CHOICE_TYPE.Single;
} & MobileChipChoiceSingleProps;

type ChipChoiceDateType = {
  type: typeof CHIP_CHOICE_TYPE.Date;
} & MobileChipChoiceDateProps;

type ChipChoiceDateTimeType = {
  type: typeof CHIP_CHOICE_TYPE.DateTime;
} & Omit<MobileChipChoiceDateProps, 'mode'> & { mode: 'date-time'; showSeconds?: boolean };

type ChipChoiceDateRangeType = {
  type: typeof CHIP_CHOICE_TYPE.DateRange;
} & MobileChipChoiceDateRangeProps;

type ChipChoiceTimeType = {
  type: typeof CHIP_CHOICE_TYPE.Time;
} & MobileChipChoiceTimeProps;

type ChipChoiceCustomType = {
  type: typeof CHIP_CHOICE_TYPE.Custom;
} & MobileChipChoiceCustomProps;

export type ChipChoiceProps = {
  id: string;
} & (
  | ChipChoiceMultipleType
  | ChipChoiceSingleType
  | ChipChoiceDateType
  | ChipChoiceDateTimeType
  | ChipChoiceDateRangeType
  | ChipChoiceTimeType
  | ChipChoiceCustomType
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type OmitBetter<T, K extends keyof any> = T extends any ? Pick<T, Exclude<keyof T, K>> : never;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export type FilterValue = Parameters<ChipChoiceProps['onChange']>[number];
