import { Item } from '../../types';

export function findItems(items: Array<Item>, value: Array<string> | string | undefined) {
  if (!value) return [];

  if (typeof value === 'string') {
    const foundItem = items.find(item => item.id === value);
    if (!foundItem) {
      return [];
    }
    return [foundItem];
  }

  return items.filter(item => value.find(val => val === item.id));
}
