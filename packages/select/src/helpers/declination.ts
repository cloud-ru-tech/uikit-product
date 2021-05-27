const cases = [2, 0, 1, 1, 1, 2];

const declOfNumSubFunction = (titles: string[], number: number): string => {
  const absoluteNumber = Math.abs(number);

  return titles[
    absoluteNumber % 100 > 4 && absoluteNumber % 100 < 20 ? 2 : cases[absoluteNumber % 10 < 5 ? absoluteNumber % 10 : 5]
  ];
};

const declination = (rest: (number: number) => string[]) => (number: number): string =>
  declOfNumSubFunction(typeof rest === 'function' ? rest(number) : rest, number);

export default declination;

export const selectUserDeclination = declination((number: number) => [
  `Выбран ${number} пользователь`,
  `Выбрано ${number} пользователя`,
  `Выбрано ${number} пользователей`,
]);

export const periodDaysDeclination = declination((number: number) => [
  `${number} день`,
  `${number} дня`,
  `${number} дней`,
]);

export const periodHoursDeclination = declination((number: number) => [
  `${number} час`,
  `${number} часа`,
  `${number} часов`,
]);
