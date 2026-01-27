import * as Icons from '@cloud-ru/uikit-product-icons';

import { PageSidebarProps } from '../src/components';

export const ICONS = Object.fromEntries(
  (Object.keys(Icons) as Array<keyof typeof Icons>).map(key => {
    const Icon = Icons[key];

    return [key, Icon];
  }),
);

export const Items: PageSidebarProps['items'] = [
  { id: 0, label: 'Инстансы', href: '#' },
  { id: 1, label: 'Мониторинг', disabledReason: 'У вас нет прав, чтобы зайти сюда', href: '#' },
  {
    id: 2,
    label: 'Администрирование',
    disabledReason: 'У вас нет прав, чтобы зайти сюда',
    disabledReasonPlacement: 'right',
    href: '#',
  },
  { id: 5, label: 'Мониторинг', href: '#' },
  { id: 6, label: 'Администрирование', href: '#' },
  { id: 7, label: 'Сеть', href: '#' },
  { id: 8, label: 'Пункт с очень-очень длинным названием', href: '#' },
  { id: 9, label: 'Инстансы', href: '#' },
  { id: 10, label: 'Мониторинг', href: '#' },
  { id: 11, label: 'Администрирование', href: '#' },
  { id: 12, label: 'Сеть', href: '#' },
  { id: 13, label: 'Инстансы', href: '#' },
  { id: 14, label: 'Мониторинг', href: '#' },
  { id: 15, label: 'Администрирование', href: '#' },
  { id: 16, label: 'Сеть', href: '#' },
  { id: 3, label: 'Сеть', beforeContent: <Icons.PlaceholderSVG />, href: '#' },
  {
    id: 'divider1',
    type: 'group',
    label: '',
    divider: true,
  },
  {
    id: 'group1',
    label: 'Основные сервисы',
    type: 'group',
    items: [
      { id: 17, label: 'Виртуальные машины', href: '#' },
      { id: 18, label: 'Контейнеры', href: '#' },
      { id: 19, label: 'Базы данных', href: '#' },
    ],
  },
  {
    id: 'group2',
    label: 'Администрирование',
    type: 'group',
    items: [
      { id: 20, label: 'Пользователи', href: '#' },
      { id: 21, label: 'Роли', href: '#' },
      { id: 22, label: 'Права доступа', href: '#' },
    ],
  },
  {
    id: 'group3',
    label: 'Мониторинг и аналитика',
    type: 'group',
    items: [
      { id: 23, label: 'Метрики', href: '#' },
      { id: 24, label: 'Логи', href: '#' },
      { id: 25, label: 'Алерты', href: '#' },
    ],
  },
  {
    id: 'collapse1',
    label: 'Дополнительные настройки',
    type: 'collapse',
    items: [
      { id: 26, label: 'Конфигурация', href: '#' },
      { id: 27, label: 'Резервное копирование', href: '#' },
      { id: 28, label: 'Восстановление', href: '#' },
    ],
  },
  {
    id: 'divider2',
    type: 'group',
    label: '',
    divider: true,
  },
  {
    id: 4,
    label: 'Инстансы',
    beforeContent: <Icons.PlaceholderSVG />,
    items: [
      {
        id: '41',
        label: 'Вложенный инстанс 1',
        items: [
          {
            id: '441',
            label: 'Вложенный инстанс 2',
            items: [
              {
                id: '4441',
                label: 'Вложенный инстанс 3',
                href: '#',
              },
              {
                id: '4442',
                label: 'Вложенный инстанс 4',
                href: '#',
              },
            ],
          },
        ],
      },
      {
        id: '42',
        label: 'Инстанс 2',
        href: '#',
      },
    ],
  },
];
