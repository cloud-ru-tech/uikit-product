export enum Size {
  Big = 'big',
  Medium = 'medium',
  Small = 'small',
}

export type BreadcrumbItem = {
  text: string | React.ReactElement;
  link?: unknown;
  key?: string;
  isActive?: boolean;
  LinkComponent?: React.ReactNode;
  fullVisible?: boolean;
};

export type StateItem = {
  text: string | React.ReactElement;
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
