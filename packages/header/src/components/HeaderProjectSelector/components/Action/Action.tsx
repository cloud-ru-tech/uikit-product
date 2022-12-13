import { ReactElement, ReactText, useContext } from 'react';

import { ButtonGhost } from '@sbercloud/uikit-product-button';

import { FloatingContext } from '../../contexts';
import { Box } from '../Box';
import { Divider } from '../Divider';
import * as S from './styled';

export type ActionProps = {
  text: ReactText;
  icon: ReactElement;
  createDisabledReason?: string;
  onClick(): void;
};

export function Action({ text, icon, createDisabledReason, onClick }: ActionProps) {
  const { setIsOpen } = useContext(FloatingContext);

  function handleClick() {
    onClick();
    setIsOpen(false);
  }

  return (
    <>
      <Divider />
      <Box data-disabled={Boolean(createDisabledReason) || undefined}>
        <S.Action
          icon={icon}
          iconPosition={ButtonGhost.iconPosition.Before}
          variant={ButtonGhost.variants.Tertiary}
          text={text}
          tooltip={
            Boolean(createDisabledReason)
              ? { content: createDisabledReason, placement: ButtonGhost.placements.Right }
              : undefined
          }
          disabled={Boolean(createDisabledReason)}
          onClick={handleClick}
          data-test-id='header-project-selector__action'
        />
      </Box>
    </>
  );
}
