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

export interface FormGroupProps {
  number: number;
  title: string;
  hint?: string;
}

export const FormGroup: React.FC<FormGroupProps> = ({
  number,
  title,
  hint,
  children,
}) => (
  <Wrapper>
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
