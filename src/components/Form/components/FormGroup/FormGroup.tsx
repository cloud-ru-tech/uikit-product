import { HelpSVG } from '@sbercloud/icons';

import { BasicTooltip } from 'components';

import {
  Wrapper,
  Header,
  Number,
  Title,
  Content,
  hintClassName,
  tooltipTriggerClassName,
} from './styled';

export const VARIANT = {
  POPUP: 'popup',
} as const;

export interface FormGroupProps {
  number: number;
  title: string;
  hint?: string;
  variant?: typeof VARIANT[keyof typeof VARIANT] | null;
}

export const FormGroup: React.FC<FormGroupProps> = ({
  number,
  title,
  hint,
  variant = VARIANT.POPUP,
  children,
}) => (
  <Wrapper data-variant={variant}>
    <Header>
      <Number>{number}</Number>

      <Title>{title}</Title>

      {hint && (
        <BasicTooltip tooltip={hint} classNameTrigger={tooltipTriggerClassName}>
          <HelpSVG size={20} className={hintClassName} />
        </BasicTooltip>
      )}
    </Header>

    <Content>{children}</Content>
  </Wrapper>
);
