import { MouseEvent, useMemo } from 'react';

import { TruncateString } from '@sbercloud/uikit-product-truncate-string';

import { useSidebarContext } from '../../../../contexts';
import { Mode, SidebarItem } from '../../../../types';
import { ItemPostfix } from '../../../ItemPostfix';
import * as S from './styled';

export type HoverMenuItemProps = SidebarItem & {
  level: number;
  onClick(e: MouseEvent): void;
  closeMenu(): void;
};

export function HoverMenuItem({
  id,
  label,
  href,
  onClick,
  showNewLabel,
  count,
  locked,
  nestedList,
  disabled,
  mode = Mode.Slide,
  level,
  closeMenu,
}: HoverMenuItemProps) {
  const { active, handleItemClick } = useSidebarContext();
  const showChildren = nestedList && mode === Mode.Accordion;
  const isItemDisabled = disabled || showChildren || undefined;
  const handleClick = (e: MouseEvent) => {
    onClick(e);
    closeMenu();
  };

  const offsetArray = useMemo(() => {
    if (level === undefined) {
      return [];
    }

    return Array.from({ length: level }, (_, index) => index + 1);
  }, [level]);

  return (
    <>
      <S.MenuItem
        href={href}
        data-active={id === active || undefined}
        data-disabled={isItemDisabled}
        onClick={isItemDisabled ? undefined : handleClick}
        data-test-id={`sidebar__hover-menu-item-${id}`}
      >
        {offsetArray.length > 0 && (
          <S.Offsets>
            {offsetArray.map(value => (
              <S.Offset key={value} />
            ))}
          </S.Offsets>
        )}

        <S.MenuItemLabel
          data-test-id='sidebar__hover-menu-item__text'
          data-level={level}
          text={label}
          placement={TruncateString.placements.Right}
          maxLines={1}
        />
        <ItemPostfix count={count} locked={locked} showNewLabel={showNewLabel} disabled={isItemDisabled} />
      </S.MenuItem>

      {showChildren &&
        nestedList.map(({ items }) =>
          items.map(item => (
            <HoverMenuItem
              {...item}
              key={item.id}
              level={level + 1}
              onClick={handleItemClick(item)}
              closeMenu={closeMenu}
            />
          )),
        )}
    </>
  );
}
