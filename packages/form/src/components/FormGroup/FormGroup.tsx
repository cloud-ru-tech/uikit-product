import { PropsWithChildren } from 'react';

import { QuestionInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { Tooltip, TooltipProps } from '@sbercloud/uikit-product-tooltip';

import { Content, Header, hintClassName, Number, Title, tooltipTriggerClassName, Wrapper } from './styled';

export type FormGroupProps = PropsWithChildren<{
  number?: number;
  className?: string;
  title?: React.ReactNode;
  hint?: Omit<TooltipProps, 'children' | 'type'>;
}>;

export function FormGroup({ className, number, title, hint, children }: FormGroupProps) {
  return (
    <Wrapper className={className}>
      {title && (
        <Header>
          {typeof number === 'number' && <Number>{number}</Number>}

          <Title>{title}</Title>

          {hint && (
            <Tooltip {...hint} classNameTrigger={tooltipTriggerClassName} type={Tooltip.types.Instant}>
              <QuestionInterfaceSVG size={20} className={hintClassName} />
            </Tooltip>
          )}
        </Header>
      )}

      <Content>{children}</Content>
    </Wrapper>
  );
}
