import { QuestionInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { BasicTooltip } from '@sbercloud/uikit-react-tooltip';

import { Content, Header, Number, Title, Wrapper, hintClassName, tooltipTriggerClassName } from './styled';

export const VARIANT = {
  POPUP: 'popup',
} as const;

export interface FormGroupProps {
  number: number;
  title: React.ReactNode;
  hint?: React.ReactNode;
  variant?: typeof VARIANT[keyof typeof VARIANT] | null;
}

export const FormGroup: React.FC<FormGroupProps> = ({ number, title, hint, variant = VARIANT.POPUP, children }) => (
  <Wrapper data-variant={variant}>
    <Header>
      <Number>{number}</Number>

      <Title>{title}</Title>

      {hint && (
        <BasicTooltip tooltip={hint} classNameTrigger={tooltipTriggerClassName}>
          <QuestionInterfaceSVG size={20} className={hintClassName} />
        </BasicTooltip>
      )}
    </Header>

    <Content>{children}</Content>
  </Wrapper>
);
