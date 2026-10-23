import { DropListItem, DropListItemSpark } from './types';

const FIRST_ITEM_DROP_LIST: DropListItem = {
  label: 'Если организации нет, укажите ее вручную',
  mode: 'secondary',
  type: 'group',
  items: [],
};

const NO_DATA_SEARCHED: DropListItem = {
  label: 'Ничего не найдено',
  mode: 'secondary',
  type: 'group',
  items: [],
};

const EMPTY_DATA: DropListItem = {
  label: 'Заполните поле',
  mode: 'secondary',
  type: 'group',
  items: [],
};

export const getItemsDropList = (loading: boolean, items?: Array<DropListItemSpark>) => {
  if (loading) {
    return [];
  }

  if (!items) {
    return [EMPTY_DATA];
  }

  if (items.length > 0) {
    return [FIRST_ITEM_DROP_LIST, ...items];
  }

  return [NO_DATA_SEARCHED];
};
