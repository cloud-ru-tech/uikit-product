import { ContentType, MenuItemsType } from './types';

export const HEADER_DESKTOP_WIDTH = 1269;

export const MENU_ITEMS: MenuItemsType = [
  {
    id: '0',
    title: 'Продукты',
    type: 'catalog' as ContentType,
  },
  {
    id: '1',
    title: 'Цены',
    type: 'list' as ContentType,
  },
  {
    id: '2',
    title: 'Документация',
    type: 'list' as ContentType,
  },
  {
    id: '3',
    title: 'О компании',
    type: 'list' as ContentType,
  },
  {
    id: '4',
    title: 'Для бизнеса',
    type: 'list' as ContentType,
    gridColumns: 'three',
  },
  {
    id: '5',
    title: 'Сообщество',
    type: 'list' as ContentType,
    gridColumns: 'four',
  },
];

export const consoleUrl = 'https://console.cloud.ru';

export const consoleRedirectUrl = `${consoleUrl}/static-page/login-destination`;
