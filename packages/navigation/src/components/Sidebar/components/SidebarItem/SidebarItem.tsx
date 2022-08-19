import { MouseEvent, useMemo } from 'react';

import { useSidebarContext } from '../../context';
import { SidebarItemProps } from '../../types';
import { SidebarItemPostfix } from '../SidebarItemPostfix';
import * as S from './styled';

type SidebarItem = SidebarItemProps & {
  isOpen?: boolean;
  level?: number;
  showArrow?: boolean;
  selected?: boolean;
  onClick?(e: MouseEvent): void;
};

export function SidebarItem({
  id,
  text,
  icon,
  count,
  isNew,
  isLocked,
  disabled,
  showArrow,
  level,
  onClick,
  isOpen,
  selected: outerSelected,
}: SidebarItem) {
  const { selected } = useSidebarContext();

  const isSelected = id === selected || outerSelected || undefined;

  const offsetIconsArray = useMemo(() => {
    if (level === undefined) {
      return [];
    }

    return Array.from({ length: level }, (_, index) => index + 1);
  }, [level]);

  return (
    <S.Item
      onClick={onClick}
      data-disabled={disabled || undefined}
      data-selected={isSelected}
      data-no-hover={!Boolean(onClick) || undefined}
      data-test-id='sidebar__item'
    >
      <S.Content>
        <S.IconContainer>
          {icon && (
            <>
              {offsetIconsArray.map(value => (
                <S.Icon key={value} />
              ))}

              <S.Icon data-test-id='sidebar__item__icon'>{icon}</S.Icon>
            </>
          )}
        </S.IconContainer>

        <S.Text data-test-id='sidebar__item__text'>{text}</S.Text>
      </S.Content>

      <SidebarItemPostfix
        count={count}
        isLocked={isLocked}
        isNew={isNew}
        disabled={disabled}
        showArrow={showArrow}
        isOpen={isOpen}
      />
    </S.Item>
  );
}
