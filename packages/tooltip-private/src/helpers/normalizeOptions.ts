import { PopperOptions } from 'react-popper-tooltip';

import { Placements } from './types';

const FALLBACK_PLACEMENTS: Placements[] = [
  Placements.Top,
  Placements.TopStart,
  Placements.TopEnd,
  Placements.RightStart,
  Placements.Right,
  Placements.RightEnd,
  Placements.Bottom,
  Placements.BottomEnd,
  Placements.BottomStart,
  Placements.LeftEnd,
  Placements.Left,
  Placements.LeftStart,
];

export const normalizeOptions = (options: PopperOptions = {}) => ({
  ...options,
  modifiers: [
    {
      name: 'flip',
      options: {
        fallbackPlacements: FALLBACK_PLACEMENTS,
      },
    },
    ...(options.modifiers || []),
  ],
});
