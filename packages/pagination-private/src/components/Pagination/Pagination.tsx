import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-product-utils';

import { PaginationEntry, PaginationEntryKind, getPaginationEntries } from '../../utils';
import { PaginationArrowButton } from '../PaginationArrowButton';
import { PaginationMoreButton } from '../PaginationMoreButton';
import { PaginationNumberButton } from '../PaginationNumberButton';
import { ArrowItem, EntryItem, ItemList } from './styled';

const FIRST_PAGE = 1;
const ARROW_STEP = 1;
const MAX_LENGTH = 7;

export type PaginationProps = WithSupportProps<{
  total: number;
  page: number;
  className?: string;
  onChange: (page: number) => void;
}>;

export function Pagination({ total, page, className, onChange, ...rest }: PaginationProps) {
  const entries = getPaginationEntries({
    firstPage: FIRST_PAGE,
    lastPage: total,
    currentPage: page,
    maxLength: MAX_LENGTH,
  });

  function handleArrowButtonClick(isPrev: boolean) {
    onChange(isPrev ? page - ARROW_STEP : page + ARROW_STEP);
  }

  function handleMoreButtonClick(start: number, end: number) {
    onChange(Math.floor((start + end) / 2));
  }

  function renderEntry(entry: PaginationEntry, index: number) {
    const dataTestId = `pagination-entry-item-${index}`;

    if (entry.kind === PaginationEntryKind.Page) {
      return (
        <EntryItem key={entry.page} data-test-id={dataTestId}>
          <PaginationNumberButton page={entry.page} selected={entry.page === page} onClick={onChange} />
        </EntryItem>
      );
    }

    if (entry.kind === PaginationEntryKind.Break) {
      return (
        <EntryItem key={`${entry.start}-${entry.end}`} data-test-id={dataTestId}>
          <PaginationMoreButton start={entry.start} end={entry.end} onClick={handleMoreButtonClick} />
        </EntryItem>
      );
    }
  }

  return (
    <nav className={className} {...extractSupportProps(rest)}>
      <ItemList>
        <ArrowItem>
          <PaginationArrowButton
            variant={PaginationArrowButton.variants.Prev}
            disabled={page === FIRST_PAGE}
            onClick={handleArrowButtonClick}
          />
        </ArrowItem>
        {entries.map(renderEntry)}
        <ArrowItem>
          <PaginationArrowButton
            variant={PaginationArrowButton.variants.Next}
            disabled={page === total}
            onClick={handleArrowButtonClick}
          />
        </ArrowItem>
      </ItemList>
    </nav>
  );
}
