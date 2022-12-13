import { Counter } from '@sbercloud/uikit-product-counter';
import { Label } from '@sbercloud/uikit-product-label';
import { useLanguage } from '@sbercloud/uikit-product-utils';

import { textProvider, Texts } from '../../helpers';
import { SidebarItem } from '../../types';
import * as S from './styled';

type ItemPostfixProps = Pick<SidebarItem, 'count' | 'showNewLabel' | 'locked' | 'disabled'> & {
  showArrow?: boolean;
  isOpen?: boolean;
};

export function ItemPostfix({ count, showNewLabel, locked, disabled, showArrow, isOpen }: ItemPostfixProps) {
  const { languageCode } = useLanguage();
  const showElements = Boolean(showNewLabel || count || locked || showArrow);

  if (!showElements) {
    return null;
  }

  return (
    <S.Elements data-disabled={disabled || undefined}>
      {showNewLabel && (
        <Label
          data-test-id='sidebar__item__postfix__label'
          text={textProvider(languageCode, Texts.ItemNew)}
          variant={Label.variants.Green}
        />
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
