import { ElementType, MouseEvent as ReactMouseEvent, useCallback, useState } from 'react';
import type { PolymorphicPropsWithRef } from 'react-polymorphic-types';

import { CopiedInterfaceSVG, CopyInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { copyToClipboard, useLanguage } from '@sbercloud/uikit-utils';

import { Texts, extractCommonButtonProps, textProvider } from '../../helpers';
import { WithTooltipProps } from '../../hocs';
import { useIsMounted } from '../../hooks';
import { ButtonIconTransparent } from '../';

export type CopyButtonOwnProps = { text: string; icon?: never } & Pick<WithTooltipProps, 'tooltip'>;

export const CopyButtonDefaultElement = ButtonIconTransparent;

export type CopyButtonProps<T extends ElementType = typeof CopyButtonDefaultElement> = PolymorphicPropsWithRef<
  CopyButtonOwnProps,
  T
>;

export function CopyButton<T extends ElementType = typeof CopyButtonDefaultElement>({
  as,
  text,
  onClick,
  ...rest
}: CopyButtonProps<T>) {
  const Element: ElementType = as || CopyButtonDefaultElement;

  const [completed, setCompleted] = useState(false);
  const isMounted = useIsMounted();

  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  const copy = useCallback(() => {
    copyToClipboard(text);
    setCompleted(true);

    setTimeout(() => {
      if (isMounted.current) {
        setCompleted(false);
      }
    }, 2000);
  }, [text, isMounted]);

  const wrappedOnClick = useCallback(
    (event: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => {
      copy();
      onClick?.(event);
    },
    [copy, onClick],
  );

  const extractedProps: ReturnType<typeof extractCommonButtonProps> & { variant?: unknown } =
    extractCommonButtonProps(rest);

  if ('variant' in rest) {
    extractedProps.variant = rest.variant;
  }

  return (
    <Element
      icon={completed ? <CopiedInterfaceSVG /> : <CopyInterfaceSVG />}
      onClick={wrappedOnClick}
      tooltip={{ content: textProvider(languageCode, Texts.copy) }}
      {...extractedProps}
    />
  );
}
