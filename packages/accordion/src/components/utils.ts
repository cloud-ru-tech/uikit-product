import { Tooltip, TooltipProps } from '@sbercloud/uikit-product-tooltip';

export function getTooltipProps(
  value: string | Omit<TooltipProps, 'children' | 'type'>,
): Omit<TooltipProps, 'children'> {
  return {
    type: Tooltip.types.Instant,
    ...(typeof value === 'string' ? { content: value } : value),
  };
}
