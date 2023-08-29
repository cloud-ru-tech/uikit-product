import { cx } from '@linaria/core';
import { ReactNode, useMemo } from 'react';

import { DropdownMenu } from '@sbercloud/uikit-product-dropdown';
import { TagProps } from '@sbercloud/uikit-product-tag';

import { MultiSelectOptionType } from '../../../helpers/types';
import { TagValue } from '../TagValue';
import * as S from './styled';

export function TagValueMore({
  dropdownMenuClassName,
  items,
  onRemove,
}: {
  dropdownMenuClassName?: string;
  items: MultiSelectOptionType[];
  onRemove: TagProps['onRemoveClick'];
}) {
  const actions = useMemo(
    () => (
      <>
        {items.reduce((acc, curr, idx) => {
          if (typeof curr.label === 'string' || typeof curr.label === 'number') {
            acc.push(<TagValue key={idx} value={curr.label} onRemoveClick={onRemove} />);
          }
          return acc;
        }, [] as ReactNode[])}
      </>
    ),
    [items, onRemove],
  );

  return (
    <DropdownMenu
      actions={actions}
      closeOnMenuClick={false}
      dropdownMenuClassName={cx(S.dropdownClassName, dropdownMenuClassName)}
      placement={DropdownMenu.placements.BottomStart}
    >
      <TagValue value={`+${items.length}`} />
    </DropdownMenu>
  );
}
