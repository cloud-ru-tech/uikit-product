import { Checkbox } from '../../components';
import { LEGAL_DOCUMENT_LINKS } from '../../constants/legalDocuments';
import { FieldProps } from './FieldProps';

const LABEL = (
  <>
    Я ознакомлен(а) и согласен(а) с{' '}
    <a href={LEGAL_DOCUMENT_LINKS.eventParticipationRules} target='_blank' rel='noopener noreferrer'>
      правилами поведения
    </a>{' '}
    участников на мероприятии
  </>
);

export function ConsentForExternalEvents(props: FieldProps) {
  const { className, disabled, onFieldFill } = props;

  const handleChange = (checked: boolean) => {
    if (checked) {
      onFieldFill('checkbox consentForExternalEvents');
    }
  };

  return (
    <div className={className}>
      <Checkbox
        label={LABEL}
        value='true'
        name='event_participation_rules_consent'
        required
        disabled={disabled}
        onChange={handleChange}
      />
    </div>
  );
}
