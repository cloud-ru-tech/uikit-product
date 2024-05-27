import { QuotaDropdownProps } from '../QuotaDropdown';
import { NoData } from './NoData';
import { QuotaDropdownLayout } from './QuotaDropdownLayout';

export function QuotaDropdownContent({ onRetry, dataError, children, ...rest }: QuotaDropdownProps) {
  if (!dataError) {
    return <QuotaDropdownLayout {...rest}>{children}</QuotaDropdownLayout>;
  }

  return <QuotaDropdownLayout {...rest}>{<NoData onRetry={onRetry} />}</QuotaDropdownLayout>;
}
