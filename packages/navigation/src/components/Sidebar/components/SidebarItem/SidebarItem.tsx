import { MouseEvent, useMemo } from 'react';

import { Counter } from '@sbercloud/uikit-product-counter';
import { Label } from '@sbercloud/uikit-product-label';
import { useLanguage } from '@sbercloud/uikit-product-utils';

import { textProvider, Texts } from '../../../../helpers';
import { useSidebarContext } from '../../context';
import { SidebarItemProps } from '../../types';
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
  const { languageCode } = useLanguage();

  const { selected } = useSidebarContext();

  const isSelected = id === selected || outerSelected || undefined;

  const offsetIconsArray = useMemo(() => {
    if (level === undefined) {
      return [];
    }

    return Array.from({ length: level }, (_, index) => index + 1);
  }, [level]);

  const showElements = Boolean(isNew || count || isLocked || showArrow);

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

      {showElements && (
        <S.Elements>
          {isNew && (
            <Label
              data-test-id='sidebar__item__label'
              text={textProvider(languageCode, Texts.SidebarItemNew)}
              variant={Label.variants.Green}
            />
          )}

          {count !== undefined && <Counter value={count} />}

          {isLocked && <S.LockIcon data-test-id='sidebar__item__disabled-icon' size={20} />}

          {showArrow && (
            <S.AccordionArrowIcon data-selected={isOpen || undefined} data-test-id='sidebar__item__accordion-button' />
          )}
        </S.Elements>
      )}
    </S.Item>
  );
}
