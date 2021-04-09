export type BreadcrumbItem = {
  text: string;
  link?: string;
  key?: string;
  isActive?: boolean;
  LinkComponent?: React.ReactNode;
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
};
