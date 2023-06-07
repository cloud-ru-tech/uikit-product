import { ReactNode } from 'react';

export function EmptyCalendarHeader() {
  return <></>;
}
export function EmptyCalendarContainer({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}
