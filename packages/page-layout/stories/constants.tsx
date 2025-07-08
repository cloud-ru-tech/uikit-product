import * as Icons from '@sbercloud/uikit-product-icons';

import { PageSidebarProps } from '../src/components';

export const ICONS = Object.fromEntries(
  (Object.keys(Icons) as Array<keyof typeof Icons>).map(key => {
    const Icon = Icons[key];

    return [key, Icon];
  }),
);

export const Items: PageSidebarProps['items'] = [
  { id: 0, label: 'Инстансы' },
  { id: 1, label: 'Мониторинг', disabledReason: 'У вас нет прав, чтобы зайти сюда' },
  {
    id: 2,
    label: 'Администрирование',
    disabledReason: 'У вас нет прав, чтобы зайти сюда',
    disabledReasonPlacement: 'right',
  },
  { id: 5, label: 'Мониторинг' },
  { id: 6, label: 'Администрирование' },
  { id: 7, label: 'Сеть' },
  { id: 8, label: 'Пункт с очень-очень длинным названием' },
  { id: 9, label: 'Инстансы' },
  { id: 10, label: 'Мониторинг' },
  { id: 11, label: 'Администрирование' },
  { id: 12, label: 'Сеть' },
  { id: 13, label: 'Инстансы' },
  { id: 14, label: 'Мониторинг' },
  { id: 15, label: 'Администрирование' },
  { id: 16, label: 'Сеть' },
  { id: 3, label: 'Сеть', beforeContent: <Icons.PlaceholderSVG /> },
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
              },
              {
                id: '4442',
                label: 'Вложенный инстанс 4',
              },
            ],
          },
        ],
      },
      {
        id: '42',
        label: 'Инстанс 2',
      },
    ],
  },
];
