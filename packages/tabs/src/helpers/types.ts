import { ReactText, RefObject } from 'react';

export type TabId = ReactText;

export type SelectedTabRef = RefObject<HTMLLIElement> | null;

export enum Sizes {
  Medium = 'Medium',
  Large = 'Large',
}

export enum CounterTypes {
  Count = 'Count',
  Notify = 'Notify',
}
