import { getRange } from './getRange';

export enum PaginationEntryKind {
  Page = 'page',
  Break = 'break',
}

function createPageEntry(page: number): PaginationEntry {
  return { kind: PaginationEntryKind.Page, page };
}

function createBreakEntry(start: number, end: number): PaginationEntry {
  return { kind: PaginationEntryKind.Break, start, end };
}

function isFullyDisplayedPagesLimitExceeded({ lastPage, fullyDisplayedPagesLimit }: PaginationOptions) {
  return lastPage > fullyDisplayedPagesLimit;
}

function isCurrentPageWithSiblingsGreaterThanFirstPage({
  firstPage,
  currentPage,
  currentPageSiblingsCount,
}: PaginationOptions) {
  return currentPage - currentPageSiblingsCount * 2 > firstPage;
}

function isCurrentPageWithSiblingsLessThanLastPage({
  lastPage,
  currentPage,
  currentPageSiblingsCount,
}: PaginationOptions) {
  return currentPage + currentPageSiblingsCount * 2 < lastPage;
}

type PaginationOptions = {
  firstPage: number;
  lastPage: number;
  currentPage: number;
  currentPageSiblingsCount: number;
  fullyDisplayedPagesLimit: number;
};

interface PaginationEntriesProducer {
  isActive: boolean;
  getEntries(): PaginationEntry[];
}

class LeftPaginationEntriesProducer implements PaginationEntriesProducer {
  private readonly options: PaginationOptions;

  public constructor(options: PaginationOptions) {
    this.options = options;
  }

  public get isActive() {
    const { currentPage, fullyDisplayedPagesLimit, currentPageSiblingsCount } = this.options;

    return (
      isFullyDisplayedPagesLimitExceeded(this.options) &&
      isCurrentPageWithSiblingsLessThanLastPage(this.options) &&
      currentPage + currentPageSiblingsCount <= fullyDisplayedPagesLimit
    );
  }

  public getEntries() {
    const { firstPage, lastPage, currentPage, fullyDisplayedPagesLimit, currentPageSiblingsCount } = this.options;
    const groupFirstPage = firstPage;
    const groupLastPage =
      currentPage - currentPageSiblingsCount <= firstPage
        ? fullyDisplayedPagesLimit - currentPageSiblingsCount
        : currentPage + currentPageSiblingsCount;
    const group = getRange(groupFirstPage, groupLastPage).map(createPageEntry);

    return [...group, createBreakEntry(groupLastPage + 1, lastPage - 1), createPageEntry(lastPage)];
  }
}

class MiddlePaginationEntriesProducer implements PaginationEntriesProducer {
  private readonly options: PaginationOptions;

  public constructor(options: PaginationOptions) {
    this.options = options;
  }

  public get isActive() {
    return (
      isCurrentPageWithSiblingsGreaterThanFirstPage(this.options) &&
      isCurrentPageWithSiblingsLessThanLastPage(this.options)
    );
  }

  public getEntries() {
    const { firstPage, lastPage, currentPage, currentPageSiblingsCount } = this.options;
    const groupFirstPage = currentPage - currentPageSiblingsCount;
    const groupLastPage = currentPage + currentPageSiblingsCount;
    const group = getRange(groupFirstPage, groupLastPage).map(createPageEntry);

    return [
      createPageEntry(firstPage),
      createBreakEntry(firstPage + 1, groupFirstPage - 1),
      ...group,
      createBreakEntry(groupLastPage + 1, lastPage - 1),
      createPageEntry(lastPage),
    ];
  }
}

class RightPaginationEntriesProducer implements PaginationEntriesProducer {
  private readonly options: PaginationOptions;

  public constructor(options: PaginationOptions) {
    this.options = options;
  }

  public get isActive() {
    const { lastPage, currentPage, fullyDisplayedPagesLimit, currentPageSiblingsCount } = this.options;

    return (
      isFullyDisplayedPagesLimitExceeded(this.options) &&
      isCurrentPageWithSiblingsGreaterThanFirstPage(this.options) &&
      lastPage - currentPage + currentPageSiblingsCount <= fullyDisplayedPagesLimit
    );
  }

  public getEntries() {
    const { firstPage, lastPage, currentPage, currentPageSiblingsCount, fullyDisplayedPagesLimit } = this.options;
    const groupFirstPage =
      currentPage + currentPageSiblingsCount >= lastPage
        ? lastPage - fullyDisplayedPagesLimit + currentPageSiblingsCount + firstPage
        : currentPage - currentPageSiblingsCount;
    const groupLastPage = lastPage;
    const group = getRange(groupFirstPage, groupLastPage).map(createPageEntry);

    return [createPageEntry(firstPage), createBreakEntry(firstPage + 1, groupFirstPage - 1), ...group];
  }
}

export type PaginationEntry =
  | { kind: PaginationEntryKind.Page; page: number }
  | { kind: PaginationEntryKind.Break; start: number; end: number };

export function getPaginationEntries(options: PaginationOptions) {
  const entriesProducers: PaginationEntriesProducer[] = [
    new LeftPaginationEntriesProducer(options),
    new MiddlePaginationEntriesProducer(options),
    new RightPaginationEntriesProducer(options),
  ];

  for (const entriesProducer of entriesProducers) {
    if (entriesProducer.isActive) {
      return entriesProducer.getEntries();
    }
  }

  return getRange(options.firstPage, options.lastPage).map(createPageEntry);
}
