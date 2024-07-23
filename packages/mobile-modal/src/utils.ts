import { ALIGN, CONTENT_ALIGN } from './constants';
import { Align } from './types';

const MAP_ALIGNS = {
  [ALIGN.Default]: {
    header: CONTENT_ALIGN.Default,
    body: CONTENT_ALIGN.Default,
    footer: ALIGN.Vertical,
  },
  [ALIGN.Center]: {
    header: CONTENT_ALIGN.Center,
    body: CONTENT_ALIGN.Center,
    footer: ALIGN.Center,
  },
  [ALIGN.Vertical]: {
    header: CONTENT_ALIGN.Center,
    body: CONTENT_ALIGN.Center,
    footer: ALIGN.Vertical,
  },
};

export function getAlignProps({ align }: { align: Align }) {
  return MAP_ALIGNS[align];
}

export function getButtonsSize() {
  return 'm' as const;
}
