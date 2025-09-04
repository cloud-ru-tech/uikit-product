import { LinksGroup } from '../types';

export type SearchHandler = (searchValue: string, items: LinksGroup[]) => LinksGroup[] | undefined;
export type SearchFunction = {
  id: string;
  label: string;
  handler: SearchHandler;
};

export type SearchProps = {
  searchValue: string;
  // Колбек на измение значения в поиске
  onSearchValueChange(value: string): void;
  // Опции для чипов
  searchFunctions: SearchFunction[];
  // Колбек на смену функции
  onChangeSearchFn(id: string): void;
  // Выбранная функция (по id из searchFunctions)
  searchFn?: string;
};
