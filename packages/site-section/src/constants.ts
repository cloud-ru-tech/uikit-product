import { SectionColor } from './types';

export const SECTION_COLORS = {
  NeutralBackground1Level: 'neutral-background1-level',
  NeutralBackground: 'neutral-background',
  GraphiteAccentDefault: 'graphite-accent-default',
} as const;

export const SECTION_COLORS_INVERTED: Record<SectionColor, SectionColor> = {
  [SECTION_COLORS.NeutralBackground]: SECTION_COLORS.NeutralBackground1Level,
  [SECTION_COLORS.NeutralBackground1Level]: SECTION_COLORS.NeutralBackground,
  [SECTION_COLORS.GraphiteAccentDefault]: SECTION_COLORS.NeutralBackground1Level,
};
