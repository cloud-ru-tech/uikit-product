import { ForwardRefExoticComponent, useEffect, useRef, useState } from 'react';

import { useLocale } from '@cloud-ru/uikit-product-locale';
import { Tooltip, TooltipProps } from '@snack-uikit/tooltip';

import { ButtonPrimaryVariant, ButtonSecondaryVariant } from './types';

export function useButtonWithTooltip<T extends Record<string, unknown>>({
  Button,
  tooltip,
}: {
  tooltip?: TooltipProps;
  Button: ForwardRefExoticComponent<T>;
}) {
  if (tooltip) {
    return function ButtonWithTooltip(props: T) {
      return (
        <Tooltip {...tooltip}>
          <Button {...props} />
        </Tooltip>
      );
    };
  }

  return Button;
}

/**
 * Показывает тень у прилипшего футера, только пока под ним есть прокручиваемый контент.
 * Отслеживает «сентинел» внизу формы: как только он попадает во вьюпорт (доскроллили до конца),
 * тень скрывается.
 */
export function useStickyFooterShadow(enabled?: boolean) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;

    if (!enabled || !sentinel || typeof IntersectionObserver === 'undefined') {
      setAtBottom(false);

      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => setAtBottom(entry.isIntersecting), { threshold: 1 });

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [enabled]);

  return { sentinelRef, atBottom };
}

export function useGetButtonLabel() {
  const { t } = useLocale('PageLayout');

  return function getButtonLabel(variant: ButtonPrimaryVariant | ButtonSecondaryVariant): string {
    return t(`PageForm.${variant}`);
  };
}
