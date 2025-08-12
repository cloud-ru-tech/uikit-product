import { PlaceholderSVG } from '@sbercloud/uikit-product-icons';
import { FiltersState } from '@snack-uikit/chips';
import { toaster } from '@snack-uikit/toaster';

import { MobileToolbarProps } from '../src';
import { TEST_ID_TOASTER } from './testIds';

export function generateOptions(length: number) {
  return Array.from({ length: Number(length) || 3 }).map((_, i) => ({
    content: { option: `Option ${i + 1}` },
    onClick: () =>
      toaster.userAction.neutral({ label: `Option ${i + 1} clicked`, 'data-test-id': TEST_ID_TOASTER.option }),
    icon: <PlaceholderSVG />,
  }));
}

export function extractToolbarArgs<TState extends FiltersState, T extends MobileToolbarProps<TState>>({
  outline,
  selectionMode,
}: Partial<T>) {
  return { outline, selectionMode };
}
