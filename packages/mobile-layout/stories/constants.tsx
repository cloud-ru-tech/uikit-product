import * as Icons from '@snack-uikit/icons';

export const ICONS = Object.fromEntries(
  (Object.keys(Icons) as Array<keyof typeof Icons>).map(key => {
    const Icon = Icons[key];

    return [key, Icon];
  }),
);
