export const FORMATS = {
  Online: 'online',
  Offline: 'offline',
  Hybrid: 'hybrid',
} as const;

export const FORMAT_LABELS = {
  [FORMATS.Online]: 'Онлайн',
  [FORMATS.Offline]: 'Офлайн',
  [FORMATS.Hybrid]: 'Гибрид',
};

export const AUDIENCES = {
  It: 'it',
  Students: 'students',
  Business: 'business',
} as const;

export const AUDIENCE_LABELS = {
  [AUDIENCES.It]: 'Для IT',
  [AUDIENCES.Students]: 'Для студентов',
  [AUDIENCES.Business]: 'Для бизнеса',
};

export const PARTICIPANT_COUNT_FORMS = {
  One: 'регистрация',
  Few: 'регистрации',
  Many: 'регистраций',
} as const;
