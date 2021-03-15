export const getAbbreviation = (str = '', size = 2): string => {
  const SPACE = ' ';
  const trimStr = str.trim();

  if (!trimStr) {
    return '';
  }

  if (str && str.length > size) {
    trimStr
      .replace(/(\s{2,})/g, SPACE)
      .split(SPACE)
      .slice(0, 2)
      .map(el => el?.charAt(0)?.toUpperCase())
      .join('');
  }

  return trimStr;
};
