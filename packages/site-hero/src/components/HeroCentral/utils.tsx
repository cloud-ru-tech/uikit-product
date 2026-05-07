export const TYPOGRAPHY_BY_LAYOUT = {
  mobile: {
    title: { purpose: 'headline', size: 'm' },
    subtitle: { purpose: 'title', size: 'm' },
    description: { purpose: 'body', size: 'l' },
  },
  tablet: {
    title: { purpose: 'headline', size: 'l' },
    subtitle: { purpose: 'title', size: 'm' },
    description: { purpose: 'body', size: 'l' },
  },
  desktop: {
    title: { purpose: 'display', size: 'm' },
    subtitle: { purpose: 'headline', size: 's' },
    description: { purpose: 'body', size: 'l' },
  },
  desktopSmall: {
    title: { purpose: 'display', size: 'm' },
    subtitle: { purpose: 'headline', size: 's' },
    description: { purpose: 'body', size: 'm' },
  },
} as const;
