import { SECTION_COLORS } from '../../constants';
import { SectionColor } from '../../types';

export const getAppearanceByBackground = (backgroundColor: SectionColor): 'neutral' | 'invert' =>
  backgroundColor === SECTION_COLORS.GraphiteAccentDefault ? 'invert' : 'neutral';
