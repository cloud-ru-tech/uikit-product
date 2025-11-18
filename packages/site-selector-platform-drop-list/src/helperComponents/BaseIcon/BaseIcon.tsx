import { IconSelector, Item } from '../../types';
import { IconItemList } from '../IconItemList';

type BaseIconProps = {
  baseIcon?: IconSelector;
  value: Array<Item>;
  lengthDroplist: number;
};

export function BaseIcon({ baseIcon, value, lengthDroplist }: BaseIconProps) {
  if (value.length === 1) {
    return <IconItemList icon={value[0].icon} />;
  }

  if (!baseIcon || (value.length > 1 && lengthDroplist !== value.length)) {
    return null;
  }

  return <IconItemList icon={baseIcon} />;
}
