import { ReactNode } from 'react';

import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { Types, Variant } from '../../helpers';
import { StatusDot } from '../StatusDot';
import { Content, Wrapper } from './styled';

export type StatusTagProps = {
  type?: Types;
  variant?: Variant;
  className?: string;
  text: ReactNode;
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
      <StatusDot type={type} />
      {text && <Content data-test-id='status-tag__text'>{text}</Content>}
    </Wrapper>
  );
}

StatusTag.types = Types;
StatusTag.variants = Variant;
