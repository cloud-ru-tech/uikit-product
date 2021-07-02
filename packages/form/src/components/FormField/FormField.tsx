import { QuestionInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { useLanguage } from '@sbercloud/uikit-react-localization';
import { BasicTooltip } from '@sbercloud/uikit-react-tooltip';

import { FORM_FIELD_TRANSLATIONS } from '../../helpers/formFieldTranslations';
import * as S from './styled';

export type FormFieldProps = {
  hint?: React.ReactNode;
  label?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
  description?: React.ReactNode;
};

export const FormField: React.FC<FormFieldProps> = ({ label, hint, description, required, error, children }) => {
  const langCode = useLanguage();
  const requiredFieldTranslation = FORM_FIELD_TRANSLATIONS.REQUIRED_FIELD[langCode];

  return (
    <S.Wrapper>
      {label && (
        <S.Label>
          {label}
          {hint && (
            <BasicTooltip tooltip={hint} classNameTrigger={S.tooltipTriggerClassName}>
              <QuestionInterfaceSVG size={20} className={S.hintClassName} />
            </BasicTooltip>
          )}
        </S.Label>
      )}
      {children}
      {required && !error && <S.Required>{requiredFieldTranslation}</S.Required>}
      {error && <S.Error>{error}</S.Error>}
      {description && <S.Description>{description}</S.Description>}
    </S.Wrapper>
  );
};
