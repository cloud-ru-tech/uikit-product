import { AgreementName } from '../types';

export const AGREEMENT_LINKS = {
  site_services_consent: 'https://cdn.cloud.ru/docs/legal/security/cybersecurity-pd/pd-processing-consent-site.pdf',
  online_event_consent:
    'https://cdn.cloud.ru/docs/legal/security/cybersecurity-pd/pd-processing-consent-online-events.pdf',
  education_consent: 'https://cdn.cloud.ru/docs/legal/security/cybersecurity-pd/pd-processing-consent-education.pdf',
  partnership_services_consent:
    'https://cdn.cloud.ru/docs/legal/security/cybersecurity-pd/pd-processing-consent-partnership-site.pdf',
} satisfies Record<AgreementName, string>;

export const LEGAL_DOCUMENT_LINKS = {
  personalDataPolicy: 'https://cdn.cloud.ru/docs/legal/security/cybersecurity-pd/pd-processing-policy.pdf',
  privacyPolicy: 'https://cdn.cloud.ru/docs/legal/security/cybersecurity-pd/confidentiality-policy.pdf',
  mailingConsent:
    'https://cdn.cloud.ru/docs/legal/security/cybersecurity-pd/pd-processing-consent-materials-mailing.pdf',
  eventParticipationRules: 'https://cdn.cloud.ru/docs/legal/security/cybersecurity-pd/event-participation-rules.pdf',
} as const;
