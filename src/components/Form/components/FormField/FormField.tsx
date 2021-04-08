import { HelpSVG } from '@sbercloud/icons';

import { BasicTooltip } from 'components';

import {
  Wrapper,
  Label,
  Error,
  tooltipTriggerClassName,
  hintClassName,
} from './styled';

export interface FormFieldProps {
  label?: string;
  hint?: string;
  error?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  hint,
  error,
  children,
}) => (
  <Wrapper>
    {label && (
      <Label>
        {label}
        {hint && (
          <BasicTooltip
            tooltip={hint}
            classNameTrigger={tooltipTriggerClassName}
          >
            <HelpSVG size={20} className={hintClassName} />
          </BasicTooltip>
        )}
      </Label>
    )}
    {children}
    {error && <Error>{error}</Error>}
  </Wrapper>
);
