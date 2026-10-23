const RUSSIA_CODE = '7';
const PHONE_LENGTH = 11;

type ParsedPhone = {
  digits: string;
  hasPlus: boolean;
  shift: number;
};

export function parsePhone(raw: string): ParsedPhone {
  const hasPlus = raw.trimStart().startsWith('+');
  let digits = raw.replace(/\D/g, '');
  let shift = 0;

  if (!hasPlus && digits.startsWith('8')) {
    digits = RUSSIA_CODE + digits.slice(1);
  } else if (digits && !digits.startsWith(RUSSIA_CODE)) {
    digits = RUSSIA_CODE + digits;
    shift = 1;
  }

  return { digits: digits.slice(0, PHONE_LENGTH), hasPlus, shift };
}

function formatPhoneDigits(digits: string): string {
  const [area, first, second, third] = [
    digits.slice(1, 4),
    digits.slice(4, 7),
    digits.slice(7, 9),
    digits.slice(9, 11),
  ];

  let result = `+${RUSSIA_CODE}`;

  if (area) result += ` (${area}`;
  if (first) result += `) ${first}`;
  if (second) result += `-${second}`;
  if (third) result += `-${third}`;

  return result;
}

export function normalizePhone(raw: string): string {
  const { digits, hasPlus } = parsePhone(raw);

  if (!digits) {
    return hasPlus ? '+' : '';
  }

  return `+${digits}`;
}

export function formatPhone(raw: string): string {
  const { digits, hasPlus } = parsePhone(raw);

  if (!digits) {
    return hasPlus ? '+' : '';
  }

  return formatPhoneDigits(digits);
}

export function getCaretPosition(formatted: string, digitsBeforeCaret: number): number {
  if (digitsBeforeCaret <= 0) {
    return Math.min(1, formatted.length);
  }

  let counted = 0;

  for (let index = 0; index < formatted.length; index++) {
    if (/\d/.test(formatted[index])) {
      counted++;

      if (counted === digitsBeforeCaret) {
        return index + 1;
      }
    }
  }

  return formatted.length;
}

export function countDigits(value: string): number {
  return value.replace(/\D/g, '').length;
}
