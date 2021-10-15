import {
  RocketInterfaceSVG,
  SendInterfaceSVG,
  Smile5InterfaceSVG,
  ViewTileInterfaceSVG,
} from '@sbercloud/uikit-react-icons';

import { FilterTypes } from '../../src/constants';

export const mockFilters = {
  fastFilters: [
    { icon: <ViewTileInterfaceSVG />, name: 'Все данные', id: 1 },
    { icon: <RocketInterfaceSVG />, name: 'SberCloud рекомендует', id: 2 },
    { icon: <SendInterfaceSVG />, name: 'Популярные', id: 3 },
    { icon: <Smile5InterfaceSVG />, name: 'Бесплатные', id: 4 },
  ],
  filters: [
    {
      title: 'Категории',
      type: FilterTypes.Checkbox,
      id: 1,
      items: [
        { name: 'Финансы', amount: 125, id: 1 },
        { name: 'Здоровье', amount: 98, id: 2 },
        { name: 'Демография', amount: 32, id: 3 },
        { name: 'Спорт', amount: 16, id: 4 },
      ],
    },
    {
      title: 'Тип лицензии',
      type: FilterTypes.Radio,
      id: 2,
      items: [
        { name: 'Apache', amount: 125, id: 1 },
        { name: 'License 2', amount: 98, id: 2 },
        { name: 'License 3', amount: 32, id: 3 },
        { name: 'License 4', amount: 32, id: 4 },
        { name: 'License 5', amount: 32, id: 5 },
        { name: 'License 6', amount: 32, id: 6 },
        { name: 'Все типы', id: 7 },
      ],
    },
    {
      title: 'Тип покупки',
      type: FilterTypes.Radio,
      id: 3,
      items: [
        { name: 'По подписке', amount: 125, id: 1 },
        { name: 'Разовая покупка', amount: 98, id: 2 },
        { name: 'Бесплатно', amount: 32, id: 3 },
        { name: 'Все типы', id: 4 },
      ],
    },
  ],
};
