import { RadioCheckedInterfaceSVG, RadioUncheckedInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { extractDataTestProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import * as S from './styled';

export type RadioIconPrivateProps = WithSupportProps<{
  checked?: boolean;
  disabled?: boolean;
  className?: string;
}>;

export function RadioIconPrivate({ checked, disabled, className, ...rest }: RadioIconPrivateProps) {
  return (
    <S.IconContainer
      className={className}
      data-checked={checked}
      data-disabled={disabled}
      {...extractDataTestProps(rest)}
    >
      {checked ? <RadioCheckedInterfaceSVG size={20} /> : <RadioUncheckedInterfaceSVG size={20} />}
    </S.IconContainer>
  );
}
