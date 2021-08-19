import { ElementType } from 'react';
import type { PolymorphicPropsWithRef } from 'react-polymorphic-types';

import { RefreshInterfaceSVG } from '@sbercloud/uikit-react-icons';

import { extractCommonButtonProps, rotateOnClickClassName } from '../../helpers';
import { ButtonIconTransparent } from '../';

export type RefreshButtonOwnProps = { icon?: never };

export const RefreshButtonDefaultElement = ButtonIconTransparent;

export type RefreshButtonProps<T extends ElementType = typeof RefreshButtonDefaultElement> = PolymorphicPropsWithRef<
  RefreshButtonOwnProps,
  T
>;

const AnimatedRefreshIcon = (props: unknown) => <RefreshInterfaceSVG className={rotateOnClickClassName} {...props} />;

export function RefreshButton<T extends ElementType = typeof RefreshButtonDefaultElement>({
  as,
  ...rest
}: RefreshButtonProps<T>) {
  const Element: ElementType = as || RefreshButtonDefaultElement;

  const extractedProps: ReturnType<typeof extractCommonButtonProps> & { variant?: unknown } =
    extractCommonButtonProps(rest);

  if ('variant' in rest) {
    extractedProps.variant = rest.variant;
  }

  return <Element icon={<AnimatedRefreshIcon />} {...extractedProps} />;
}
