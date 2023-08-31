export function getAutoCompleteAttributeValue(autoComplete: boolean | string): string {
  if (typeof autoComplete === 'string') {
    return autoComplete;
  }

  return autoComplete ? 'on' : 'off';
}
