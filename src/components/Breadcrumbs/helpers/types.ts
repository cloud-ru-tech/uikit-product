export type BreadcrumbItem = {
  text: string;
  link?: unknown;
  key?: string;
  isActive?: boolean;
  LinkComponent?: React.ReactNode;
  fullVisible?: boolean;
};

export type StateItem = {
  text: string;
  link?: string;
  key?: string;
  isActive?: boolean;
  LinkComponent?: React.ReactNode;
  visible: boolean;
  tooltip: boolean;
  width?: number;
  fullVisible?: boolean;
  isLastForceVisible?: boolean;
};
