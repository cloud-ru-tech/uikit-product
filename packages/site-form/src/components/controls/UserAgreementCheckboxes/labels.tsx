import { LEGAL_DOCUMENT_LINKS } from '../../../constants/legalDocuments';

export const USER_AGREEMENT_ANALYTICS_TEXT =
  'Я даю согласие на обработку моих персональных данных в соответствии с условиями политики конфиденциальности';

export const MAILING_CONSENT_ANALYTICS_TEXT =
  'Я подтверждаю свое согласие на получение рекламных и информационных сообщений в соответствии с условиями политики конфиденциальности';

export function UserAgreementLabel({ consentLink }: { consentLink: string }) {
  return (
    <>
      Я даю{' '}
      <a href={consentLink} target='_blank' rel='noopener noreferrer'>
        согласие
      </a>{' '}
      на обработку моих персональных данных в соответствии с{' '}
      <a href={LEGAL_DOCUMENT_LINKS.personalDataPolicy} target='_blank' rel='noopener noreferrer'>
        политикой обработки персональных данных
      </a>{' '}
      и{' '}
      <a href={LEGAL_DOCUMENT_LINKS.privacyPolicy} target='_blank' rel='noopener noreferrer'>
        политикой конфиденциальности
      </a>
    </>
  );
}

export function MailingConsentLabel() {
  return (
    <>
      Я подтверждаю свое{' '}
      <a href={LEGAL_DOCUMENT_LINKS.mailingConsent} target='_blank' rel='noopener noreferrer'>
        согласие
      </a>{' '}
      на получение рекламных и информационных сообщений в соответствии с условиями{' '}
      <a href={LEGAL_DOCUMENT_LINKS.privacyPolicy} target='_blank' rel='noopener noreferrer'>
        политики конфиденциальности
      </a>
    </>
  );
}
