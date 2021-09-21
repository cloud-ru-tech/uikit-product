import { QuestionInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { Tooltip, TooltipProps } from '@sbercloud/uikit-react-tooltip';
import { useLanguage } from '@sbercloud/uikit-utils';

import { FORM_FIELD_TRANSLATIONS } from '../../helpers/formFieldTranslations';
import * as S from './styled';

export type FormFieldProps = {
  hint?: Omit<TooltipProps, 'children'>;
  label?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
  description?: React.ReactNode;
};

export const FormField: React.FC<FormFieldProps> = ({ label, hint, description, required, error, children }) => {
  const { code: langCode } = useLanguage();
  const requiredFieldTranslation = FORM_FIELD_TRANSLATIONS.REQUIRED_FIELD[langCode];

  return (
    <S.Wrapper>
      {label && (
        <S.Label>
          {label}
          {hint && (
            <Tooltip {...hint} classNameTrigger={S.tooltipTriggerClassName}>
              <QuestionInterfaceSVG size={20} className={S.hintClassName} />
            </Tooltip>
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
