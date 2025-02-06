import { ValueOf } from '@snack-uikit/utils';

import { AUDIENCES, FORMATS } from './constants';

export type Format = ValueOf<typeof FORMATS>;
export type Audience = ValueOf<typeof AUDIENCES>;
