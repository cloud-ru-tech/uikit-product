import { ValueOf } from '@snack-uikit/utils';

import { COPY_BUTTON_HIDE_STRATEGY, SIZES } from './constants';

export type CopyButtonHideStrategy = ValueOf<typeof COPY_BUTTON_HIDE_STRATEGY>;

export type Size = keyof typeof SIZES;
