import { FooterBlock, FooterLink } from './types';

const CONTACTS_BLOCK: FooterBlock = {
  blocks: [
    {
      title: 'Техническая поддержка',
      links: [
        {
          text: '8 800 444-24-99',
          url: 'tel:+78004442499',
        },
        {
          text: 'support@cloud.ru',
          url: 'mailto:support@cloud.ru',
        },
        {
          text: 'Чат в Telegram',
          url: 'https://t.me/cloudruprovider',
          target: '_blank',
        },
        {
          text: 'Связаться с нами',
          url: '/consultation',
        },
      ],
    },
    {
      title: 'Офис',
      links: [
        {
          text: '+7 495 260-10-82',
          url: 'tel:+74952601082',
        },
      ],
    },
    {
      title: 'Пресс-служба',
      links: [
        {
          text: 'pr@cloud.ru',
          url: 'mailto:pr@cloud.ru',
        },
      ],
    },
  ],
};

const PRODUCTS_BLOCK: FooterBlock = {
  blocks: [
    {
      title: 'Продукты',
      links: [
        {
          text: 'Виртуальная машина',
          url: '/products/evolution-compute',
        },
        {
          text: 'Кластеры Kubernetes',
          url: '/products/evolution-managed-kubernetes',
        },
        {
          text: 'Объектное хранилище S3',
          url: '/products/evolution-object-storage',
        },
        {
          text: 'Marketplace',
          url: '/marketplace',
        },
        {
          text: 'Зарубежные аналоги',
          url: '/analogi',
        },
        {
          text: 'Другие сервисы',
          url: '/services',
        },
        {
          text: 'Все продукты',
          url: '/products',
        },
      ],
    },
  ],
};

const BUSINESS_BLOCK: FooterBlock = {
  blocks: [
    {
      title: 'Для бизнеса',
      links: [
        {
          text: 'Cloud.ru Evolution',
          url: '/evolution',
        },
        {
          text: 'Cloud.ru Advanced ',
          url: '/advanced',
        },
        {
          text: 'Облако VMware',
          url: '/vmware',
        },
        {
          text: 'Cloud.ru ML Space',
          url: '/mlspace',
        },
        {
          text: 'Решения',
          url: '/solutions',
        },
        {
          text: 'Кейсы',
          url: '/cases',
        },
        {
          text: 'Партнеры',
          url: '/partners',
        },
      ],
    },
  ],
};

const OTHER_LINKS_BLOCK: FooterBlock = {
  blocks: [
    {
      title: 'Сообщество',
      links: [
        {
          text: 'Блог',
          url: '/blog',
        },
        {
          text: 'Обучение и сертификация',
          url: '/education',
        },
        {
          text: 'Мероприятия',
          url: '/events',
        },
        {
          text: 'Исследования Cloud.ru',
          url: '/issledovanie-oblachnye-tehnologii',
        },
        {
          text: 'Реферальная программа',
          url: '/partners/referral',
        },
      ],
    },
    {
      title: 'Разработчикам',
      links: [
        {
          text: 'Документация',
          url: '/docs/index.html',
          target: '_blank',
        },
      ],
    },
  ],
};

export const BOTTOM_LINKS: FooterLink[] = [
  {
    text: 'О нас',
    url: '/about',
  },
  {
    text: 'Карьера',
    url: '/career',
  },
  {
    text: 'Новости',
    url: '/news',
  },
  {
    text: 'Контакты',
    url: '/contacts',
  },
  {
    text: 'Юридические документы',
    url: '/documents/',
  },
  {
    text: 'Политика конфиденциальности',
    url: 'https://cdn.cloud.ru/backend/docs/security/politic.pdf ',
    target: '_blank',
  },
];

export const BODY_BLOCKS: FooterBlock[] = [CONTACTS_BLOCK, PRODUCTS_BLOCK, BUSINESS_BLOCK, OTHER_LINKS_BLOCK];
