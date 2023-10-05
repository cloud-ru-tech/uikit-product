import { Config, PopperOptions } from 'react-popper-tooltip';

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

export const normalizeOptions = ({
  popperOptions = {},
  offset,
}: {
  popperOptions?: PopperOptions;
  offset: Config['offset'];
}) => ({
  ...popperOptions,
  modifiers: [
    {
      name: 'offset',
      options: { offset },
    },
    {
      name: 'flip',
      options: {
        fallbackPlacements: FALLBACK_PLACEMENTS,
      },
    },
    ...(popperOptions.modifiers || []),
  ],
});
