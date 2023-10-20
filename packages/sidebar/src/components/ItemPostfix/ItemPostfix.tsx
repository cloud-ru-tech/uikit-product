import { Counter } from '@sbercloud/uikit-product-counter';
import { Label } from '@sbercloud/uikit-product-label';

import { SidebarItem } from '../../types';
import * as S from './styled';

type ItemPostfixProps = Pick<SidebarItem, 'count' | 'labelText' | 'locked' | 'disabled'> & {
  showArrow?: boolean;
  isOpen?: boolean;
};

export function ItemPostfix({ count, labelText, locked, disabled, showArrow, isOpen }: ItemPostfixProps) {
  const showElements = Boolean(labelText || count || locked || showArrow);

  if (!showElements) {
    return null;
  }

  return (
    <S.Elements data-disabled={disabled || undefined}>
      {labelText && (
        <Label data-test-id='sidebar__item__postfix__label' text={labelText} variant={Label.variants.Green} />
      )}

      {count !== undefined && <Counter value={count} data-test-id='sidebar__item__postfix__counter' />}

      {locked && <S.LockIcon data-test-id='sidebar__item__postfix__locked-icon' size={20} />}

      {showArrow && (
        <S.AccordionArrowIcon
          data-opened={isOpen || undefined}
          data-test-id='sidebar__item__postfix__accordion-button'
        />
      )}
    </S.Elements>
  );
}
