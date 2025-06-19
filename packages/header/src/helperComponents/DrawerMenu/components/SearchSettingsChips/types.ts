import { ValueOf } from '@snack-uikit/utils';

import { SEARCH_PRECISION } from './constants';

export type SearchPrecision = ValueOf<typeof SEARCH_PRECISION>;

export type SearchSettings = {
  precision: SearchPrecision;
};
