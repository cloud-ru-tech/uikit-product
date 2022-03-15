import { Button } from './styled';

export type PaginationNumberButtonProps = {
  page: number;
  selected: boolean;
  onClick: (page: number) => void;
};

export function PaginationNumberButton({ page, selected, onClick }: PaginationNumberButtonProps) {
  function handleClick() {
    onClick(page);
  }

  return (
    <Button
      key={selected ? 'selected' : undefined} // To prevent CSS transition on `selected` change.
      onClick={handleClick}
      aria-current={selected ? 'page' : undefined}
      data-selected={selected || undefined}
      data-test-id={`pagination-number-button-${page}`}
    >
      {page}
    </Button>
  );
}
