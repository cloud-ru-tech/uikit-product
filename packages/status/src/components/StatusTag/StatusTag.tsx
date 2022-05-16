import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-product-utils';

import { Types, Variant } from '../../helpers';
import { StatusDot } from '../StatusDot';
import { Content, Wrapper, statusBadgeClassName } from './styled';

export type StatusTagProps = {
  type?: Types;
  variant?: Variant;
  className?: string;
  text: string;
};

export function StatusTag({
  type = Types.Success,
  variant = Variant.Transparent,
  text,
  className,
  ...rest
}: WithSupportProps<StatusTagProps>) {
  return (
    <Wrapper className={className} data-variant={variant} {...extractSupportProps(rest)}>
      <StatusDot type={type} className={statusBadgeClassName} />
      {text && <Content>{text}</Content>}
    </Wrapper>
  );
}

StatusTag.types = Types;
StatusTag.variants = Variant;
