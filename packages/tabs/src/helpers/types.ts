import { ReactText, RefObject } from 'react';

export type TabId = ReactText;

export type SelectedTabRef = RefObject<HTMLLIElement> | null;
export type TabsWrapperRef = RefObject<HTMLDivElement> | null;

export enum Sizes {
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
}
