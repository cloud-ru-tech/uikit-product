import { MouseEvent } from 'react';

import { TruncateString } from '@sbercloud/uikit-product-truncate-string';

import { useSidebarContext } from '../../contexts';
import { SidebarItem } from '../../types';
import { ItemPostfix } from '../ItemPostfix';
import { ListItemIcon } from '../ListItemIcon';
import * as S from './styled';

type ListItemProps = SidebarItem & {
  isOpen?: boolean;
  level?: number;
  showArrow?: boolean;
  onClick?(e: MouseEvent): void;
  isMobile?: boolean;
};

export function ListItem({
  id,
  label,
  href,
  icon,
  count,
  labelText,
  locked,
  disabled,
  showArrow,
  level,
  onClick,
  isOpen,
  status,
  isMobile,
}: ListItemProps) {
  const { active } = useSidebarContext();

  const isActive = id === active || undefined;

  return (
    <S.Item
      href={href}
      onClick={onClick}
      data-disabled={disabled || undefined}
      data-active={isActive}
      data-no-hover={!Boolean(onClick) || undefined}
      data-test-id={`sidebar__item-${id}`}
      data-mobile={isMobile || undefined}
    >
      <S.Content>
        <S.IconContainer>
          <S.Padding level={level} />
          {icon && <ListItemIcon icon={icon} status={status} disabled={disabled} active={isActive} />}
        </S.IconContainer>

        <S.Label
          data-test-id='sidebar__item__label'
          text={label}
          placement={TruncateString.placements.Right}
          maxLines={1}
        />
      </S.Content>

      <ItemPostfix
        count={count}
        locked={locked}
        labelText={labelText}
        disabled={disabled}
        showArrow={showArrow}
        isOpen={isOpen}
      />
    </S.Item>
  );
}
