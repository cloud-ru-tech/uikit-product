import { ValueOf } from '@snack-uikit/utils';

import { AUDIENCES, CATEGORY_TAGS, FORMATS, HERO_BUTTONS, HERO_EVENT_COLORS } from './constants';

export type HeroEventColor = ValueOf<typeof HERO_EVENT_COLORS>;
export type Format = ValueOf<typeof FORMATS>;
export type Audience = ValueOf<typeof AUDIENCES>;
export type HeroButtonType = ValueOf<typeof HERO_BUTTONS>;
export type Category = ValueOf<typeof CATEGORY_TAGS>;
