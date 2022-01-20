import { ElementType } from 'react';
import type { PolymorphicPropsWithRef } from 'react-polymorphic-types';

import { RefreshInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { useLanguage } from '@sbercloud/uikit-utils';

import { Texts, extractCommonButtonProps, rotateOnClickClassName, textProvider } from '../../helpers';
import { WithTooltipProps } from '../../hocs';
import { ButtonIconTransparent } from '../';

export type RefreshButtonOwnProps = { icon?: never } & Pick<WithTooltipProps, 'tooltip'>;

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
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  const Element: ElementType = as || RefreshButtonDefaultElement;

  const extractedProps: ReturnType<typeof extractCommonButtonProps> & { variant?: unknown } =
    extractCommonButtonProps(rest);

  if ('variant' in rest) {
    extractedProps.variant = rest.variant;
  }

  return (
    <Element
      icon={<AnimatedRefreshIcon />}
      tooltip={rest.tooltip || { content: textProvider(languageCode, Texts.Refresh) }}
      {...extractedProps}
    />
  );
}
