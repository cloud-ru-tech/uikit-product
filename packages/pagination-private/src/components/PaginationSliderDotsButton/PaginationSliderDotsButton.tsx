import { MouseEvent } from 'react';

import { Dot, Link } from './styled';

export type PaginationSliderDotsButtonProps = {
  page: number;
  selected: boolean;
  onClick: (page: number) => void;
};

export function PaginationSliderDotsButton({ page, selected, onClick }: PaginationSliderDotsButtonProps) {
  function handleClick(event: MouseEvent) {
    event.preventDefault();
    onClick(page);
  }

  return (
    <Link
      role='button'
      onClick={handleClick}
      tabIndex={0}
      aria-current={selected ? 'page' : undefined}
      data-selected={selected || undefined}
    >
      <Dot />
    </Link>
  );
}
