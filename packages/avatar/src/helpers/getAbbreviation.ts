import { ABBREVIATION_LENGTH } from './constants';

const getAbbreviation = (str = ''): string => {
  const SPACE = ' ';
  const trimStr = str.trim();

  if (!trimStr) {
    return '';
  }

  if (str && str.length > ABBREVIATION_LENGTH) {
    return trimStr
      .replace(/(\s{2,})/g, SPACE)
      .split(SPACE)
      .slice(0, ABBREVIATION_LENGTH)
      .map(el => el?.charAt(0)?.toUpperCase())
      .join('');
  }

  return trimStr;
};

export { getAbbreviation };
