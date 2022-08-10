import { QuestionInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { Tooltip, TooltipProps } from '@sbercloud/uikit-product-tooltip';

import { Content, Header, hintClassName, Number, Title, tooltipTriggerClassName, Wrapper } from './styled';

export interface FormGroupProps {
  number?: number;
  className?: string;
  title?: React.ReactNode;
  hint?: Omit<TooltipProps, 'children'>;
}

export const FormGroup: React.FC<FormGroupProps> = ({ className, number, title, hint, children }) => (
  <Wrapper className={className}>
    {title && (
      <Header>
        {typeof number === 'number' && <Number>{number}</Number>}

        <Title>{title}</Title>

        {hint && (
          <Tooltip {...hint} classNameTrigger={tooltipTriggerClassName}>
            <QuestionInterfaceSVG size={20} className={hintClassName} />
          </Tooltip>
        )}
      </Header>
    )}

    <Content>{children}</Content>
  </Wrapper>
);
