import { HelpSVG } from '@sbercloud/icons';
import { BasicTooltip } from '@sbercloud/uikit-react-tooltip';

import * as S from './styled';

export type FormFieldProps = {
  label?: string;
  hint?: string;
  description?: string;
  required?: boolean;
  error?: string;
};

export const FormField: React.FC<FormFieldProps> = ({ label, hint, description, required, error, children }) => (
  <S.Wrapper>
    {label && (
      <S.Label>
        {label}
        {hint && (
          <BasicTooltip tooltip={hint} classNameTrigger={S.tooltipTriggerClassName}>
            <HelpSVG size={20} className={S.hintClassName} />
          </BasicTooltip>
        )}
      </S.Label>
    )}
    {children}
    {required && !error && <S.Required>Обязательно для заполнения</S.Required>}
    {error && <S.Error>{error}</S.Error>}
    {description && <S.Description>{description}</S.Description>}
  </S.Wrapper>
);
