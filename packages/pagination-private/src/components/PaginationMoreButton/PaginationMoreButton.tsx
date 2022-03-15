import { PaginationButton } from '../PaginationButton';

export type PaginationMoreButtonProps = {
  start: number;
  end: number;
  onClick: (start: number, end: number) => void;
};

export function PaginationMoreButton({ start, end, onClick }: PaginationMoreButtonProps) {
  function handleClick() {
    onClick(start, end);
  }

  return (
    <PaginationButton onClick={handleClick} data-test-id={`pagination-more-button-${start}-${end}`}>
      ...
    </PaginationButton>
  );
}
