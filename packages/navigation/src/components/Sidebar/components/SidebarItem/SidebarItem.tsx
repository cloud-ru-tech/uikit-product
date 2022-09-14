import { MouseEvent } from 'react';

import { useSidebarContext } from '../../context';
import { SidebarItemProps } from '../../types';
import { SidebarItemIcon } from '../SidebarItemIcon';
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
  status,
}: SidebarItem) {
  const { active } = useSidebarContext();

  const isActive = id === active || undefined;

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
          <S.Padding level={level} />
          {icon && <SidebarItemIcon icon={icon} status={status} disabled={disabled} active={isActive} />}
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
