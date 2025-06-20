export type ValidationPassword = {
  onlyLatin: boolean;
  minLength: boolean;
  hasCapitalLetter: boolean;
  hasLowerCaseLetter: boolean;
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
  onlyLatin: LATIN_REGEX.test(password),
  minLength: password.length >= MIN_PASSWORD_LENGTH,
  hasCapitalLetter: CAPITAL_REGEX.test(password),
  hasLowerCaseLetter: LOWER_REGEX.test(password),
  hasNumber: NUMBER_REGEX.test(password),
  hasSymbol: SYMBOLS_REGEX.test(password),
  noSpaces: NO_SPACES.test(password),
});
