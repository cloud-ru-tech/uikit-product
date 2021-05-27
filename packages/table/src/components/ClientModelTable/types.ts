export type DeleteProps = {
  onConfirmDelete(): Promise<void>;
  onCancelDelete(): void;
  openDeleteDialog(): void;
  deleteDialogOpened: boolean;
  title: string;
  description: string;
  approveText: string;
  cancelText: string;
  isDeleteEnabled: boolean;
};

export type PaginationProps = {
  pageCount: number;
  currentPage: number;
  pageChangeHandler({ selected }: { selected: number }): void;
  showPagination: boolean;
};
