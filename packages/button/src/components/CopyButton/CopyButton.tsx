import { ElementType, MouseEvent as ReactMouseEvent, useCallback, useState } from 'react';
import type { PolymorphicPropsWithRef } from 'react-polymorphic-types';

import { copyToClipboard } from '@sbercloud/ft-copy-to-clipboard';
import { extractCommonButtonProps, WithTooltipProps } from '@sbercloud/uikit-product-button-private';
import { CopyInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { PredefinedIconsPrivate } from '@sbercloud/uikit-product-predefined-icons-private';
import { useLanguage } from '@sbercloud/uikit-product-utils';

import { textProvider, Texts } from '../../helpers';
import { useIsMounted } from '../../hooks';
import { ButtonIconTransparent } from '../';
import { StyledCheckInterfaceSVG } from './styled';

export type CopyButtonOwnProps = {
  text: string;
  icon?: never;
  onClickBeforeCopy?: (
    event: ReactMouseEvent<HTMLButtonElement, MouseEvent>,
  ) => Promise<{ preventCopy?: boolean; textToCopy?: string } | undefined>;
} & Pick<WithTooltipProps, 'tooltip'>;

export const CopyButtonDefaultElement = ButtonIconTransparent;

export type CopyButtonProps<T extends ElementType = typeof CopyButtonDefaultElement> = PolymorphicPropsWithRef<
  CopyButtonOwnProps,
  T
>;

export function CopyButton<T extends ElementType = typeof CopyButtonDefaultElement>({
  as,
  text,
  onClick,
  onClickBeforeCopy,
  ...rest
}: CopyButtonProps<T>) {
  const Element: ElementType = as || CopyButtonDefaultElement;

  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useIsMounted();

  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  const copy = useCallback(
    (newText?: string) => {
      copyToClipboard(newText || text);
      setIsCompleted(true);

      setTimeout(() => {
        if (isMounted.current) {
          setIsCompleted(false);
        }
      }, 800);
    },
    [text, isMounted],
  );

  const wrappedOnClick = useCallback(
    async (event: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (!onClickBeforeCopy) {
        copy();
        onClick?.(event);

        return;
      }

      setIsLoading(true);

      const response = await onClickBeforeCopy(event);

      if (!response?.preventCopy) {
        copy(response?.textToCopy);
        onClick?.(event);
      }

      setIsLoading(false);
    },
    [copy, onClick, onClickBeforeCopy],
  );

  const extractedProps: ReturnType<typeof extractCommonButtonProps> & { variant?: unknown } =
    extractCommonButtonProps(rest);

  if ('variant' in rest) {
    extractedProps.variant = rest.variant;
  }

  return (
    <Element
      icon={
        <>
          {isLoading && <PredefinedIconsPrivate icon={PredefinedIconsPrivate.icons.Loading} />}
          {!isLoading && isCompleted && <StyledCheckInterfaceSVG />}
          {!isLoading && !isCompleted && <CopyInterfaceSVG />}
        </>
      }
      onClick={wrappedOnClick}
      tooltip={{ content: textProvider(languageCode, Texts.Copy) }}
      {...extractedProps}
    />
  );
}
