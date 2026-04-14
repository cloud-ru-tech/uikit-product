export const TYPOGRAPHY_BY_LAYOUT = {
  mobile: {
    title: { purpose: 'headline', size: 'm' },
    subtitle: { purpose: 'title', size: 'm' },
  },
  tablet: {
    title: { purpose: 'headline', size: 'l' },
    subtitle: { purpose: 'title', size: 'm' },
  },
  desktop: {
    title: { purpose: 'display', size: 'm' },
    subtitle: { purpose: 'headline', size: 's' },
  },
  desktopSmall: {
    title: { purpose: 'display', size: 'm' },
    subtitle: { purpose: 'headline', size: 's' },
  },
} as const;
