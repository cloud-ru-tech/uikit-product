import { ElementType } from 'react';
import type { PolymorphicPropsWithRef } from 'react-polymorphic-types';

import {
  extractCommonButtonProps,
  rotateOnClickClassName,
  WithTooltipProps,
} from '@sbercloud/uikit-product-button-private';
import { RefreshInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { useLanguage } from '@sbercloud/uikit-product-utils';

import { textProvider, Texts } from '../../helpers';
import { ButtonIconTransparent } from '../';

export type RefreshButtonOwnProps = { icon?: never } & Pick<WithTooltipProps, 'tooltip'>;

export const RefreshButtonDefaultElement = ButtonIconTransparent;

export type RefreshButtonProps<T extends ElementType = typeof RefreshButtonDefaultElement> = PolymorphicPropsWithRef<
  RefreshButtonOwnProps,
  T
>;

export function RefreshButton<T extends ElementType = typeof RefreshButtonDefaultElement>({
  as,
  ...rest
}: RefreshButtonProps<T>) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  const Element: ElementType = as || RefreshButtonDefaultElement;

  const extractedProps: ReturnType<typeof extractCommonButtonProps> & { variant?: unknown } =
    extractCommonButtonProps(rest);

  if ('variant' in rest) {
    extractedProps.variant = rest.variant;
  }

  return (
    <Element
      icon={<RefreshInterfaceSVG className={rotateOnClickClassName} />}
      tooltip={rest.tooltip || { content: textProvider(languageCode, Texts.Refresh) }}
      {...extractedProps}
    />
  );
}
