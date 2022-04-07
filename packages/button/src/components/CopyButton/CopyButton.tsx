import { ElementType, MouseEvent as ReactMouseEvent, useCallback, useState } from 'react';
import type { PolymorphicPropsWithRef } from 'react-polymorphic-types';

import { copyToClipboard } from '@sbercloud/ft-copy-to-clipboard';
import { WithTooltipProps, extractCommonButtonProps } from '@sbercloud/uikit-react-button-private';
import { CopyInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { useLanguage } from '@sbercloud/uikit-utils';

import { Texts, textProvider } from '../../helpers';
import { useIsMounted } from '../../hooks';
import { ButtonIconTransparent } from '../';
import { StyledCheckInterfaceSVG } from './styled';

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
    }, 800);
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
      icon={completed ? <StyledCheckInterfaceSVG /> : <CopyInterfaceSVG />}
      onClick={wrappedOnClick}
      tooltip={{ content: textProvider(languageCode, Texts.Copy) }}
      {...extractedProps}
    />
  );
}
