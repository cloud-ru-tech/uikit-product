import { ValueOf } from '@snack-uikit/utils';

import { LAYOUT_TYPE } from '../constants/adaptive';

export type MatchMediaGeneric<T extends string> = Record<T, boolean>;

export type LayoutType = ValueOf<typeof LAYOUT_TYPE>;

export type WithLayoutType<T = object> = T & { layoutType: LayoutType };
