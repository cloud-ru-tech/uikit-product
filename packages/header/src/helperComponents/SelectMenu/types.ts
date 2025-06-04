export type ItemsGroup<T> = {
  id: string;
  heading?: string;
  items: T[];
  hidden?: boolean;
};
