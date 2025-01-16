import { PromoTagProps } from '@snack-uikit/promo-tag';
import { ValueOf } from '@snack-uikit/utils';

export const LAYOUT_TYPE = {
  Mobile: 'mobile',
  Tablet: 'tablet',
  Desktop: 'desktop',
  DesktopSmall: 'desktopSmall',
} as const;

export const CATEGORY_TAGS = {
  News: 'news',
  Article: 'article',
  PressRelease: 'press-release',
  Conference: 'conference',
  Webinar: 'webinars',
  Course: 'course',
  Certification: 'certification',
} as const;

export const CATEGORY_TAG_META: Record<ValueOf<typeof CATEGORY_TAGS>, PromoTagProps> = {
  [CATEGORY_TAGS.News]: { text: 'Новость', appearance: 'neutral' },
  [CATEGORY_TAGS.Article]: { text: 'Статья', appearance: 'neutral' },
  [CATEGORY_TAGS.PressRelease]: { text: 'Пресс-релиз', appearance: 'neutral' },
  [CATEGORY_TAGS.Conference]: { text: 'Конференция', appearance: 'violet' },
  [CATEGORY_TAGS.Webinar]: { text: 'Вебинар', appearance: 'violet' },
  [CATEGORY_TAGS.Course]: { text: 'Курс', appearance: 'blue' },
  [CATEGORY_TAGS.Certification]: { text: 'Сертификация', appearance: 'orange' },
};
