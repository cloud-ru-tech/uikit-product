/**
 * Возвращает кол-во символов для маски - со скобками и без
 * @function helper
 */
export function getSymbolsRangeFromMask(mask: string = '') {
  // Считаем все 'X' и цифры в строке
  const maxNumberLength = (mask.match(/[X\d]/g) || []).length;

  // Удаляем содержимое внутри скобок, включая сами скобки для подсчёта без учёта их содержимого
  const stringWithoutBrackets = mask.replace(/\[[^\]]*\]/g, '');

  // Считаем 'X' и цифры после удаления содержимого в скобках
  const minNumberLength = (stringWithoutBrackets.match(/[X\d]/g) || []).length;

  // Возвращаем оба значения: без учёта и с учётом содержимого в скобках
  return { minNumberLength, maxNumberLength };
}
