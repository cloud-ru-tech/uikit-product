import { HelpSVG } from '@sbercloud/icons';
import { BasicTooltip } from '@sbercloud/uikit-react-tooltip';

import { Error, Label, Wrapper, hintClassName, tooltipTriggerClassName } from './styled';

export type FormFieldProps = {
  label?: string;
  hint?: string;
  error?: string;
};

export const FormField: React.FC<FormFieldProps> = ({ label, hint, error, children }) => (
  <Wrapper>
    {label && (
      <Label>
        {label}
        {hint && (
          <BasicTooltip tooltip={hint} classNameTrigger={tooltipTriggerClassName}>
            <HelpSVG size={20} className={hintClassName} />
          </BasicTooltip>
        )}
      </Label>
    )}
    {children}
    {error && <Error>{error}</Error>}
  </Wrapper>
);
