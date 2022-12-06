import { MouseEventHandler, ReactElement } from 'react';

import * as S from './styled';

export type OverlayElementProps = {
  onClose(): void;
  content: ReactElement;
};

export function OverlayElement({ onClose, content }: OverlayElementProps) {
  const handleClick: MouseEventHandler = e => {
    e.stopPropagation();
    onClose();
  };

  return (
    <>
      <S.StyledOverlayPrivate onClick={handleClick} data-test-id='modal-private__overlay' />
      {content}
    </>
  );
}
