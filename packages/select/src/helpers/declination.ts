const cases = [2, 0, 1, 1, 1, 2];

const declOfNumSubFunction = (titles: string[], number: number): string => {
  const absoluteNumber = Math.abs(number);

  return titles[
    absoluteNumber % 100 > 4 && absoluteNumber % 100 < 20 ? 2 : cases[absoluteNumber % 10 < 5 ? absoluteNumber % 10 : 5]
  ];
};

type DeclinationType = (rest: (count: number) => string[]) => (params: Record<string, string | number>) => string;

export const declination: DeclinationType =
  rest =>
  ({ count }) => {
    if (!count) return '';
    return declOfNumSubFunction(typeof rest === 'function' ? rest(count as number) : rest, count as number);
  };
