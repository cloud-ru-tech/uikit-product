import { type FooterColumn, type FooterContent, type FooterLinkItem, type FooterSocialItem } from './types';

/**
 * id у элементов менять нельзя, нужны для аналитики. Раньше они вычислялись,
 * но после переноса в эту библиотеку, их значения были зафиксированы вручную
 */

export const FOOTER_ELEMENT = {
  Logo: 'logo',
  Link: 'link',
  SectionTitle: 'sectionTitle',
  Subscribe: 'subscribe',
  Social: 'social',
  Locale: 'locale',
} as const;

const CONTACTS_COLUMN: FooterColumn = {
  sections: [
    {
      title: 'Техническая поддержка',
      id: 'tehnicheskaya-podderzhka',
      titleUrl: '/support',
      links: [
        {
          text: '8 800 444-24-99',
          id: '8-800-444-24-99',
          url: 'tel:+78004442499',
        },
        {
          text: 'support@cloud.ru',
          id: 'support-cloud-ru',
          url: 'mailto:support@cloud.ru',
        },
      ],
    },
    {
      title: 'Контакты',
      id: 'kontakti',
      titleUrl: '/contacts',
      links: [
        {
          text: '8 800 500-51-03',
          id: '8-800-500-51-03',
          url: 'tel:+78005005103',
        },
      ],
    },
  ],
};

const PRODUCTS_COLUMN: FooterColumn = {
  sections: [
    {
      title: 'Продукты',
      id: 'produkti',
      titleUrl: '/products',
      links: [
        {
          text: 'Виртуальная машина',
          id: 'virtualnaya-mashina',
          url: '/products/evolution-compute',
        },
        {
          text: 'Agents Space',
          id: 'agents-space',
          url: '/agents-space',
        },
        {
          text: 'ИИ-помощник',
          id: 'ii-pomoschnik',
          url: '/ai-assistant',
        },
        {
          text: 'Кластеры Kubernetes',
          id: 'klasteri-kubernetes',
          url: '/products/evolution-managed-kubernetes',
        },
        {
          text: 'Объектное хранилище S3',
          id: 'obektnoe-hranilische-s3',
          url: '/products/evolution-object-storage',
        },
        {
          text: 'Маркетплейс',
          id: 'marketpleis',
          url: '/marketplace',
        },
        {
          text: 'Зарубежные аналоги',
          id: 'zarubezhnie-analogi',
          url: '/analogi',
        },
        {
          text: 'Другие сервисы',
          id: 'drugie-servisi',
          url: '/services',
        },
      ],
    },
  ],
};

const BUSINESS_COLUMN: FooterColumn = {
  sections: [
    {
      title: 'Для бизнеса',
      id: 'dlya-biznesa',
      links: [
        {
          text: 'Cloud.ru Evolution',
          id: 'cloud-ru-evolution',
          url: '/evolution',
        },
        {
          text: 'Cloud.ru Advanced',
          id: 'cloud-ru-advanced',
          url: '/advanced',
        },
        {
          text: 'Облако VMware',
          id: 'oblako-vmware',
          url: '/vmware',
        },
        {
          text: 'Cloud.ru Evolution Stack',
          id: 'cloud-ru-evolution-stack',
          url: '/evolution-stack',
        },
        {
          text: 'Решения',
          id: 'resheniya',
          url: '/solutions',
        },
        {
          text: 'Кейсы',
          id: 'keisi',
          url: '/cases',
        },
        {
          text: 'Партнеры',
          id: 'partneri',
          url: '/partners',
        },
      ],
    },
  ],
};

const COMMUNITY_COLUMN: FooterColumn = {
  sections: [
    {
      title: 'Сообщество',
      id: 'soobschestvo',
      links: [
        {
          text: 'Блог',
          id: 'blog',
          url: '/blog',
        },
        {
          text: 'Обучение и сертификация',
          id: 'obuchenie-i-sertifikatsiya',
          url: '/education',
        },
        {
          text: 'Мероприятия',
          id: 'meropriyatiya',
          url: '/events',
        },
        {
          text: 'Исследования Cloud.ru',
          id: 'issledovaniya-cloud-ru',
          url: '/research/cloud-technologies',
        },
        {
          text: 'Реферальная программа',
          id: 'referalnaya-programma',
          url: '/partners/referral',
        },
      ],
    },
    {
      title: 'Разработчикам',
      id: 'razrabotchikam',
      links: [
        {
          text: 'Документация',
          id: 'dokumentatsiya',
          url: '/docs',
          target: '_blank',
        },
      ],
    },
  ],
};

const BOTTOM_LINKS: FooterLinkItem[] = [
  {
    text: 'О нас',
    id: 'o-nas',
    url: '/about',
  },
  {
    text: 'Карьера',
    id: 'karera',
    url: '/career',
  },
  {
    text: 'Новости',
    id: 'novosti',
    url: '/blog/category/novosti',
  },
  {
    text: 'Юридические документы',
    id: 'yuridicheskie-dokumenti',
    url: '/documents',
  },
  {
    text: 'Политика конфиденциальности',
    id: 'politika-konfidentsialnosti',
    url: 'https://cdn.cloud.ru/docs/legal/security/cybersecurity-pd/confidentiality-policy.pdf',
    target: '_blank',
  },
];

const SOCIALS: FooterSocialItem[] = [
  { name: 'hb', url: 'https://habr.com/ru/companies/cloud_ru/articles/', label: 'Хабр' },
  { name: 'tg', url: 'https://t.me/cloudruprovider', label: 'Telegram' },
  { name: 'max', url: 'https://max.ru/cloudru', label: 'MAX' },
  { name: 'yt', url: 'https://www.youtube.com/@cloudru', label: 'YouTube' },
  { name: 'vk', url: 'https://vk.com/cloudru', label: 'ВКонтакте' },
];

export const FOOTER_CONTENT: FooterContent = {
  logoUrl: '/',
  locales: [
    { id: 'ru', content: 'Русский', href: '/' },
    { id: 'cn', content: '中文', href: 'https://cloudru.cn/' },
  ],
  subscribe: {
    title: 'Будьте в курсе',
    description: 'Анонсируем мероприятия, делимся кейсами клиентов и полезными материалами.',
    buttonLabel: 'Подписаться на рассылку',
    url: '/subscription',
  },
  columns: [CONTACTS_COLUMN, PRODUCTS_COLUMN, BUSINESS_COLUMN, COMMUNITY_COLUMN],
  bottomLinks: BOTTOM_LINKS,
  socials: SOCIALS,
  copyrightOwner: 'Cloud.ru',
};
