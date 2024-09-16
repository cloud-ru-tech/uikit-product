import { ValueOf } from '@snack-uikit/utils';

import { LAYOUT_TYPE, QueriesTitle } from '../constants/adaptive';

export type MatchMedia = Record<QueriesTitle, boolean>;

export type LayoutType = ValueOf<typeof LAYOUT_TYPE>;

export type WithLayoutType<T = object> = T & { layoutType: LayoutType };
