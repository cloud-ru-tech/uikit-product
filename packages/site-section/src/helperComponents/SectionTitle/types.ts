import { Tag } from '@snack-uikit/typography';
import { ValueOf } from '@snack-uikit/utils';

import { SIZE } from './constants';

export type Size = ValueOf<typeof SIZE>;
export type SectionTag = Extract<Tag, 'h2' | 'h3' | 'h4'>;
