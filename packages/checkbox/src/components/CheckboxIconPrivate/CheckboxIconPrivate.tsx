import { useMemo } from 'react';

import { CheckboxCheckedSVG, CheckboxPartialCheckedSVG } from '@sbercloud/uikit-product-icons';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import * as S from './styled';

export type CheckboxIconPrivateProps = WithSupportProps<{
  partChecked?: boolean;
  checked?: boolean;
  disabled?: boolean;
  className?: string;
}>;

export function CheckboxIconPrivate({ checked, partChecked, className, disabled, ...rest }: CheckboxIconPrivateProps) {
  const Icon = useMemo(() => {
    if (partChecked) {
      return <CheckboxPartialCheckedSVG className={S.iconClassName} />;
    }

    if (checked) {
      return <CheckboxCheckedSVG className={S.iconClassName} />;
    }

    return null;
  }, [partChecked, checked]);

  return (
    <S.CheckboxIconWrap
      className={className}
      data-test-id='checkbox__icon'
      data-checked={checked || partChecked || undefined}
      data-disabled={disabled || undefined}
      {...extractSupportProps(rest)}
    >
      {Icon}
    </S.CheckboxIconWrap>
  );
}
