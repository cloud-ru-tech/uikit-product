import { ReactElement, ReactText, useContext } from 'react';

import { ButtonGhost } from '@sbercloud/uikit-product-button';

import { FloatingContext } from '../../contexts/FloatingContext';
import { HeaderProjectSelectorBox } from '../HeaderProjectSelectorBox';
import { HeaderProjectSelectorDivider } from '../HeaderProjectSelectorDivider';
import * as S from './styled';

export type HeaderProjectSelectorActionProps = {
  text: ReactText;
  icon: ReactElement;
  onClick(): void;
};

export function HeaderProjectSelectorAction({ text, icon, onClick }: HeaderProjectSelectorActionProps) {
  const { setIsOpen } = useContext(FloatingContext);

  function handleClick() {
    onClick();
    setIsOpen(false);
  }

  return (
    <>
      <HeaderProjectSelectorDivider />
      <HeaderProjectSelectorBox>
        <S.Action
          icon={icon}
          iconPosition={ButtonGhost.iconPosition.Before}
          variant={ButtonGhost.variants.Tertiary}
          text={text}
          onClick={handleClick}
          data-test-id='header-project-selector__action'
        />
      </HeaderProjectSelectorBox>
    </>
  );
}
