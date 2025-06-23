export type ValidationPassword = {
  onlyLatin: boolean;
  minLength: boolean;
  hasLetterCases: boolean;
  hasNumber: boolean;
  hasSymbol: boolean;
  noSpaces: boolean;
};

const MIN_PASSWORD_LENGTH = 8;
const NUMBER_REGEX = /[0-9]/;
const CAPITAL_REGEX = /\p{Lu}/u;
const LOWER_REGEX = /\p{Ll}/u;
const SYMBOLS_REGEX = /[\p{P}\p{S}]/u;
const NO_SPACES = /^\S*$/u;
const LATIN_REGEX = /^[a-zA-Z0-9\p{P}\p{S}]+$/u;

export const getValidationPassword = (password: string = ''): ValidationPassword => ({
  onlyLatin: Boolean(password.match(LATIN_REGEX)),
  minLength: password.length >= MIN_PASSWORD_LENGTH,
  hasLetterCases: Boolean(password.match(CAPITAL_REGEX)) && Boolean(password.match(LOWER_REGEX)),
  hasNumber: Boolean(password.match(NUMBER_REGEX)),
  hasSymbol: Boolean(password.match(SYMBOLS_REGEX)),
  noSpaces: Boolean(password.match(NO_SPACES)),
});
