import { MouseEvent } from 'react';

import { styledPaginationButton } from './styled';
import { PaginationButtonProps } from './types';

function StylelessPaginationButton({ children, className, rel, onClick, ...rest }: PaginationButtonProps) {
  function handleClick(event: MouseEvent) {
    event.preventDefault();
    onClick();
  }

  return (
    <a role='button' className={className} onClick={handleClick} rel={rel} tabIndex={0} {...rest}>
      {children}
    </a>
  );
}

export type { PaginationButtonProps };

export const PaginationButton = styledPaginationButton(StylelessPaginationButton);
