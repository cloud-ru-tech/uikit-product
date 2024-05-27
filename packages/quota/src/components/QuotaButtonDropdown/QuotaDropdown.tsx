import { ReactNode, useState } from 'react';

import { ButtonDropdown, ButtonDropdownProps } from '@sbercloud/uikit-product-button-predefined';
import { useLanguage, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { textProvider, Texts } from '../../helpers';
import { QuotaDropdownContent } from './components';

export type QuotaDropdownProps = WithSupportProps<{
  /** Заголовок */
  title: string;
  /** Описание */
  description?: string;
  /** Тултип */
  tip?: ReactNode;
  /** Тултип */
  children: ReactNode;
  /** Флаг наличия ошибки при загрузке квот */
  dataError?: boolean;
  /** Колбек кнопки повтора */
  onRetry?(): void;
  /** Расположение выпадающего меню */
  placement?: ButtonDropdownProps['placement'];
  className?: string;
}>;

export function QuotaDropdown({ placement = 'bottom-end', className, ...props }: QuotaDropdownProps) {
  const [open, setOpen] = useState<boolean>(false);
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  return (
    <ButtonDropdown
      open={open}
      placement={placement}
      onOpenChange={setOpen}
      label={textProvider(languageCode, Texts.Quotas)}
      className={className}
      content={<QuotaDropdownContent {...props} />}
    />
  );
}
