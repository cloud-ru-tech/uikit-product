import { MouseEvent, useMemo } from 'react';

import { useSidebarContext } from '../../../../context';
import { Mode, SidebarItemProps } from '../../../../types';
import { SidebarItemPostfix } from '../../../SidebarItemPostfix';
import * as S from './styled';

export type HoverMenuItemProps = SidebarItemProps & {
  level: number;
  onClick(e: MouseEvent): void;
  closeMenu(): void;
};

export function HoverMenuItem({
  id,
  text,
  href,
  onClick,
  isNew,
  count,
  isLocked,
  nestedList,
  disabled,
  mode = Mode.Slide,
  level,
  closeMenu,
}: HoverMenuItemProps) {
  const { selected, handleItemClick } = useSidebarContext();
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
        data-selected={id === selected || undefined}
        data-disabled={isItemDisabled}
        onClick={isItemDisabled ? undefined : handleClick}
      >
        {offsetArray.length > 0 && (
          <S.Offsets>
            {offsetArray.map(value => (
              <S.Offset key={value} />
            ))}
          </S.Offsets>
        )}

        <S.MenuItemLabel data-level={level}>{text}</S.MenuItemLabel>

        <SidebarItemPostfix count={count} isLocked={isLocked} isNew={isNew} disabled={isItemDisabled} />
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
