import * as Icons from '@sbercloud/uikit-product-icons';

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
