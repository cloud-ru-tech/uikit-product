import { ReactNode } from 'react';

export type PaginationButtonProps = {
  children: ReactNode;
  className?: string;
  rel?: string;
  onClick: () => void;
};
