import { MouseEvent, useMemo } from 'react';

import { useSidebarContext } from '../../context';
import { SidebarItemProps } from '../../types';
import { SidebarItemPostfix } from '../SidebarItemPostfix';
import * as S from './styled';

type SidebarItem = SidebarItemProps & {
  isHeaderItem?: boolean;
  isOpen?: boolean;
  level?: number;
  showArrow?: boolean;
  onClick?(e: MouseEvent): void;
};

export function SidebarItem({
  id,
  label,
  href,
  icon,
  count,
  showNewLabel,
  locked,
  disabled,
  showArrow,
  level,
  onClick,
  isOpen,
  isHeaderItem,
}: SidebarItem) {
  const { active } = useSidebarContext();

  const isActive = id === active || undefined;

  const offsetIconsArray = useMemo(() => {
    if (level === undefined) {
      return [];
    }

    return Array.from({ length: level }, (_, index) => index + 1);
  }, [level]);

  const link = isHeaderItem ? undefined : href;

  return (
    <S.Item
      href={link}
      onClick={onClick}
      data-disabled={disabled || undefined}
      data-active={isActive}
      data-no-hover={!Boolean(onClick) || undefined}
      data-test-id={`sidebar__item-${id}`}
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

        <S.Label data-test-id='sidebar__item__label'>{label}</S.Label>
      </S.Content>

      <SidebarItemPostfix
        count={count}
        locked={locked}
        showNewLabel={showNewLabel}
        disabled={disabled}
        showArrow={showArrow}
        isOpen={isOpen}
      />
    </S.Item>
  );
}
