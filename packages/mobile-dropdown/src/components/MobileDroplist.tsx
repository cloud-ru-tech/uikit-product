import { List, ListProps } from '@snack-uikit/list';

import { MobileDropdown, MobileDropdownProps } from './MobileDropdown';

export type MobileDroplistProps = Omit<MobileDropdownProps, 'content'> & Pick<ListProps, 'items' | 'selection'>;

export function MobileDroplist({ items, selection, ...rest }: MobileDroplistProps) {
  return <MobileDropdown content={<List items={items} selection={selection} size='l' />} {...rest} />;
}
