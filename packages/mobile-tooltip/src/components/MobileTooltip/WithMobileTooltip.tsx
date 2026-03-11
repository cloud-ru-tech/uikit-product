import { MobileTooltip, MobileTooltipProps } from './MobileTooltip';

type WithMobileTooltipProps = {
  tooltip?: Omit<MobileTooltipProps, 'children'>;
  children: MobileTooltipProps['children'];
};

export function WithMobileTooltip({ tooltip, children }: WithMobileTooltipProps) {
  if (!tooltip?.tip) {
    return <>{children}</>;
  }

  return <MobileTooltip {...tooltip}>{children}</MobileTooltip>;
}
