import { ReactElement, ReactText, useContext } from 'react';

import { ButtonGhost } from '@sbercloud/uikit-product-button';
import { Tooltip } from '@sbercloud/uikit-product-tooltip';

import { FloatingContext } from '../../contexts/FloatingContext';
import { HeaderProjectSelectorBox } from '../HeaderProjectSelectorBox';
import { HeaderProjectSelectorDivider } from '../HeaderProjectSelectorDivider';
import * as S from './styled';

export type HeaderProjectSelectorActionProps = {
  text: ReactText;
  icon: ReactElement;
  createDisabledReason?: string;
  onClick(): void;
};

export function HeaderProjectSelectorAction({
  text,
  icon,
  createDisabledReason,
  onClick,
}: HeaderProjectSelectorActionProps) {
  const { setIsOpen } = useContext(FloatingContext);

  function handleClick() {
    onClick();
    setIsOpen(false);
  }

  return (
    <>
      <HeaderProjectSelectorDivider />
      <HeaderProjectSelectorBox data-disabled={Boolean(createDisabledReason) || undefined}>
        <S.Action
          icon={icon}
          iconPosition={ButtonGhost.iconPosition.Before}
          variant={ButtonGhost.variants.Tertiary}
          text={text}
          tooltip={
            Boolean(createDisabledReason)
              ? { content: createDisabledReason, placement: Tooltip.placements.Right }
              : undefined
          }
          disabled={Boolean(createDisabledReason)}
          onClick={handleClick}
          data-test-id='header-project-selector__action'
        />
      </HeaderProjectSelectorBox>
    </>
  );
}
