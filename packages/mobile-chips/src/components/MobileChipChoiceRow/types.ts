import { ValueOf } from '@snack-uikit/utils';

import { MobileChipChoiceCustomProps } from '../ChipChoice/components';
import { MobileChipChoiceDateProps } from '../ChipChoice/components/MobileChipChoiceDate';
import { MobileChipChoiceDateRangeProps } from '../ChipChoice/components/MobileChipChoiceDateRange';
import { CHIP_CHOICE_TYPE } from '../ChipChoice/constants';
import { MobileChipChoiceMultipleProps, MobileChipChoiceSingleProps } from '../ChipChoice/types';
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

type ChipChoiceDateRangeType = {
  type: typeof CHIP_CHOICE_TYPE.DateRange;
} & MobileChipChoiceDateRangeProps;

type ChipChoiceCustomType = {
  type: typeof CHIP_CHOICE_TYPE.Custom;
} & MobileChipChoiceCustomProps;

export type ChipChoiceProps = {
  id: string;
} & (
  | ChipChoiceMultipleType
  | ChipChoiceSingleType
  | ChipChoiceDateType
  | ChipChoiceDateRangeType
  | ChipChoiceCustomType
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type OmitBetter<T, K extends keyof any> = T extends any ? Pick<T, Exclude<keyof T, K>> : never;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export type FilterValue = Parameters<ChipChoiceProps['onChange']>[number];
