import { AGREEMENT_LINKS } from '../../../constants/legalDocuments';
import { AgreementLabels, AgreementName } from '../../../types';
import { valSchema } from '../../../validation/valSchema';
import { Checkbox } from '../Checkbox';
import {
  MAILING_CONSENT_ANALYTICS_TEXT,
  MailingConsentLabel,
  USER_AGREEMENT_ANALYTICS_TEXT,
  UserAgreementLabel,
} from './labels';
import s from './styles.module.scss';

type UserAgreementCheckboxesProps = {
  specialConsentLink?: string;
  agreementName?: AgreementName;
  checkboxClassName?: string;
  labels?: AgreementLabels;
  onFieldFill: (fieldName: string) => void;
  withSubscribeForMailing?: boolean;
  isSubscribeForMailingRequired?: boolean;
  onlyMail?: boolean;
  disabled?: boolean;
};

export function UserAgreementCheckboxes({
  agreementName = 'site_services_consent',
  specialConsentLink,
  labels,
  onFieldFill,
  withSubscribeForMailing = true,
  isSubscribeForMailingRequired = false,
  checkboxClassName,
  onlyMail = false,
  disabled,
}: UserAgreementCheckboxesProps) {
  const userAgreementLink = specialConsentLink ?? AGREEMENT_LINKS[agreementName];

  const handleAgreementChange = (checked: boolean) => {
    if (checked) {
      onFieldFill('checkbox agreement');
    }
  };

  const handleSubscribeChange = (checked: boolean) => {
    if (checked) {
      onFieldFill('checkbox reklama');
    }
  };

  return (
    <div className={s.root}>
      {!onlyMail && (
        <Checkbox
          required
          name={agreementName}
          requiredText={valSchema['userAgreement'].required.message}
          label={labels?.userAgreement ?? <UserAgreementLabel consentLink={userAgreementLink} />}
          labelOnlyTextWithoutHtml={!labels?.userAgreement ? USER_AGREEMENT_ANALYTICS_TEXT : undefined}
          value='true'
          disabled={disabled}
          onChange={handleAgreementChange}
          className={checkboxClassName}
        />
      )}

      {withSubscribeForMailing && (
        <Checkbox
          label={labels?.checkboxSubscribe ?? <MailingConsentLabel />}
          labelOnlyTextWithoutHtml={!labels?.checkboxSubscribe ? MAILING_CONSENT_ANALYTICS_TEXT : undefined}
          value='true'
          name='subscribeForMailing'
          required={isSubscribeForMailingRequired}
          disabled={disabled}
          onChange={handleSubscribeChange}
          className={checkboxClassName}
        />
      )}
    </div>
  );
}
