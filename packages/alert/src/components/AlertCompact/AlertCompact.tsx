import { ReactNode } from 'react';

import { LinkProps } from '@sbercloud/uikit-product-link';
import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-product-utils';

import * as S from './styled';

enum AlertCompactTypes {
  Default = 'Default',
  Attention = 'Attention',
}

export type AlertCompactProps = WithSupportProps<{
  description: ReactNode;
  className?: string;
  type?: AlertCompactTypes;
  linkProps?: Omit<LinkProps, 'className'>;
}>;

export function AlertCompact({
  description,
  className,
  type = AlertCompactTypes.Default,
  linkProps,
  ...rest
}: AlertCompactProps) {
  return (
    <S.Container className={className} {...extractSupportProps(rest)}>
      <S.Highlighter data-type={type} />
      <S.Content data-test-id='alert-compact__content'>
        <S.Description data-test-id='alert-compact__content-description'>{description}</S.Description>
        {Boolean(linkProps) && <S.Link {...linkProps} data-test-id='alert-compact__link' />}
      </S.Content>
    </S.Container>
  );
}

AlertCompact.types = AlertCompactTypes;
