import { Counter } from '@sbercloud/uikit-product-counter';
import { Label } from '@sbercloud/uikit-product-label';
import { useLanguage } from '@sbercloud/uikit-product-utils';

import { textProvider, Texts } from '../../../../helpers';
import { SidebarItemProps } from '../../types';
import * as S from './styled';

type SidebarItemPostfixProps = Pick<SidebarItemProps, 'count' | 'isNew' | 'isLocked' | 'disabled'> & {
  showArrow?: boolean;
  isOpen?: boolean;
};

export function SidebarItemPostfix({ count, isNew, isLocked, disabled, showArrow, isOpen }: SidebarItemPostfixProps) {
  const { languageCode } = useLanguage();
  const showElements = Boolean(isNew || count || isLocked || showArrow);

  if (!showElements) {
    return null;
  }

  return (
    <S.Elements data-disabled={disabled || undefined}>
      {isNew && (
        <Label
          data-test-id='sidebar__item__postfix__label'
          text={textProvider(languageCode, Texts.SidebarItemNew)}
          variant={Label.variants.Green}
        />
      )}

      {count !== undefined && <Counter value={count} />}

      {isLocked && <S.LockIcon data-test-id='sidebar__item__postfix__disabled-icon' size={20} />}

      {showArrow && (
        <S.AccordionArrowIcon
          data-opened={isOpen || undefined}
          data-test-id='sidebar__item__postfix__accordion-button'
        />
      )}
    </S.Elements>
  );
}
