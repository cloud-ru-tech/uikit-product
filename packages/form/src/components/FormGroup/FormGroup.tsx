import { PropsWithChildren, ReactNode } from 'react';

import { QuestionSmallOutlineInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { Tooltip, TooltipProps } from '@sbercloud/uikit-product-tooltip';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { Content, Header, hintClassName, Number, Title, tooltipTriggerClassName, Wrapper } from './styled';

export type FormGroupProps = WithSupportProps<
  PropsWithChildren<{
    number?: number;
    className?: string;
    title?: ReactNode;
    hint?: Omit<TooltipProps, 'children' | 'type'>;
  }>
>;

export function FormGroup({ className, number, title, hint, children, ...rest }: FormGroupProps) {
  return (
    <Wrapper className={className} {...extractSupportProps(rest)}>
      {title && (
        <Header>
          {typeof number === 'number' && <Number>{number}</Number>}

          <Title>{title}</Title>

          {hint && (
            <Tooltip {...hint} classNameTrigger={tooltipTriggerClassName} type={Tooltip.types.Instant}>
              <QuestionSmallOutlineInterfaceSVG size={20} className={hintClassName} />
            </Tooltip>
          )}
        </Header>
      )}

      <Content>{children}</Content>
    </Wrapper>
  );
}
