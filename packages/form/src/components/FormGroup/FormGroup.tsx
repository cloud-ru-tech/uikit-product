import { QuestionInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { Tooltip, TooltipProps } from '@sbercloud/uikit-react-tooltip';

import { Content, Header, Number, Title, Wrapper, hintClassName, tooltipTriggerClassName } from './styled';

export interface FormGroupProps {
  number: number;
  className?: string;
  title: React.ReactNode;
  hint?: Omit<TooltipProps, 'children'>;
}

export const FormGroup: React.FC<FormGroupProps> = ({ className, number, title, hint, children }) => (
  <Wrapper className={className}>
    <Header>
      <Number>{number}</Number>

      <Title>{title}</Title>

      {hint && (
        <Tooltip {...hint} classNameTrigger={tooltipTriggerClassName}>
          <QuestionInterfaceSVG size={20} className={hintClassName} />
        </Tooltip>
      )}
    </Header>

    <Content>{children}</Content>
  </Wrapper>
);
