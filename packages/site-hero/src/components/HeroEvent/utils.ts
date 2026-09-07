import { PARTICIPANT_COUNT_FORMS } from './constants';

export function getParticipantCountLabel(count: number) {
  const tens = Math.abs(count) % 100;
  const units = tens % 10;

  if (tens > 10 && tens < 20) {
    return PARTICIPANT_COUNT_FORMS.Many;
  }

  if (units === 1) {
    return PARTICIPANT_COUNT_FORMS.One;
  }

  if (units > 1 && units < 5) {
    return PARTICIPANT_COUNT_FORMS.Few;
  }

  return PARTICIPANT_COUNT_FORMS.Many;
}
