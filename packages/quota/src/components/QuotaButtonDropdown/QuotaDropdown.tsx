import { Children, isValidElement, ReactNode, useMemo, useState } from 'react';

import { ButtonDropdown, ButtonDropdownProps } from '@sbercloud/uikit-product-button-predefined';
import { useLocale } from '@sbercloud/uikit-product-locale';
import { WithSupportProps } from '@sbercloud/uikit-product-utils';

import { checkExceeded } from '../../utils';
import { QuotaCardProps } from '../QuotaCard';
import { QuotaDropdownContent } from './components';

export type QuotaDropdownProps = WithSupportProps<{
  /** Заголовок */
  title: string;
  /** Описание */
  description?: string;
  /** Quota cards */
  children: ReactNode;
  /** Флаг наличия ошибки при загрузке квот */
  dataError?: boolean;
  /** Колбек кнопки повтора */
  onRetry?(): void;
  /** Расположение выпадающего меню */
  placement?: ButtonDropdownProps['placement'];

  size?: ButtonDropdownProps['size'];

  layoutType: ButtonDropdownProps['layoutType'];

  className?: string;
}>;

export function QuotaDropdown({
  placement = 'bottom-end',
  layoutType = 'desktop',
  className,
  size,
  ...props
}: QuotaDropdownProps) {
  const [open, setOpen] = useState<boolean>(false);
  const { t } = useLocale('Quota');

  const quotaExceededCount = useMemo(
    () =>
      Children.toArray(props.children).reduce<number>(
        (count, child) =>
          isValidElement<QuotaCardProps>(child) &&
          !child?.props?.loading &&
          !child?.props?.unlimited &&
          checkExceeded((child?.props?.limit ?? 0) - (child?.props?.created ?? 0))
            ? count + 1
            : count,
        0,
      ),
    [props.children],
  );

  const isQuotaExceededCountVisible = !props.dataError && quotaExceededCount > 0;

  return (
    <ButtonDropdown
      open={open}
      placement={placement}
      onOpenChange={setOpen}
      label={t('quotas')}
      className={className}
      layoutType={layoutType}
      size={size}
      counter={isQuotaExceededCountVisible ? { appearance: 'red', value: quotaExceededCount } : undefined}
      content={<QuotaDropdownContent {...props} />}
    />
  );
}
