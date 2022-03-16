import { ToolbarFilterProps } from '@sbercloud/uikit-react-toolbar';

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

export type FilterProps<T> = ToolbarFilterProps & { doesRowPassFilter(data: T): boolean };

export type PaginationProps = {
  pageCount: number;
  currentPage: number;
  pageChangeHandler(currentPage: number): void;
  showPagination: boolean;
};
