import { ValueOf } from '@snack-uikit/utils';

import { AUDIENCES, CATEGORY_TAGS, FORMATS, HERO_BUTTONS, HERO_COLORS } from './constants';

export type HeroColor = ValueOf<typeof HERO_COLORS>;
export type Format = ValueOf<typeof FORMATS>;
export type Audience = ValueOf<typeof AUDIENCES>;
export type HeroButtonType = ValueOf<typeof HERO_BUTTONS>;
export type Category = ValueOf<typeof CATEGORY_TAGS>;
