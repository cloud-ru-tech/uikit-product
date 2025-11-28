import { MobileTooltip, MobileTooltipProps } from './MobileTooltip';

type WithMobileTooltipProps = {
  tooltip?: Omit<MobileTooltipProps, 'children'>;
  children: MobileTooltipProps['children'];
};

export function WithMobileTooltip({ tooltip, children }: WithMobileTooltipProps) {
  if (!tooltip) {
    return <>{children}</>;
  }

  return <MobileTooltip {...tooltip}>{children}</MobileTooltip>;
}
