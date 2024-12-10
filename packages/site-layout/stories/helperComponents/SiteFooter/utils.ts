function transliterate(word: string) {
  // noinspection NonAsciiCharacters
  const keys: { [key: string]: string } = {
    Ё: 'YO',
    Й: 'I',
    Ц: 'TS',
    У: 'U',
    К: 'K',
    Е: 'E',
    Н: 'N',
    Г: 'G',
    Ш: 'SH',
    Щ: 'SCH',
    З: 'Z',
    Х: 'H',
    ё: 'yo',
    й: 'i',
    ц: 'ts',
    у: 'u',
    к: 'k',
    е: 'e',
    н: 'n',
    г: 'g',
    ш: 'sh',
    щ: 'sch',
    з: 'z',
    х: 'h',
    Ф: 'F',
    Ы: 'I',
    В: 'V',
    А: 'a',
    П: 'P',
    Р: 'R',
    О: 'O',
    Л: 'L',
    Д: 'D',
    Ж: 'ZH',
    Э: 'E',
    ф: 'f',
    ы: 'i',
    в: 'v',
    а: 'a',
    п: 'p',
    р: 'r',
    о: 'o',
    л: 'l',
    д: 'd',
    ж: 'zh',
    э: 'e',
    Я: 'Ya',
    Ч: 'CH',
    С: 'S',
    М: 'M',
    И: 'I',
    Т: 'T',
    Б: 'B',
    Ю: 'YU',
    я: 'ya',
    ч: 'ch',
    с: 's',
    м: 'm',
    и: 'i',
    т: 't',
    б: 'b',
    ю: 'yu',
  };

  return word
    .split('')
    .map(char => keys[char] || char)
    .join('')
    .replace(/ь|ъ/g, '');
}

export const genStringForUrl = (str: string): string => {
  if (str.toLowerCase() === 'калькулятор') return 'calculator';

  return transliterate(str.toLowerCase())
    .replace(/[^a-zA-Z0-9/]/g, '-')
    .replace(/--+/g, '-')
    .replace(/-$/, '')
    .replace(/\//g, '-');
};
