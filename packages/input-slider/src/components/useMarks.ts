import { useEffect, useState } from 'react';

export const useMarks = (min: number, max: number, marks?: number[]) => {
  const [privateMarks, setPrivateMarks] = useState<Record<string, number>>({});

  useEffect(() => {
    const obj = {};

    if (marks) {
      marks.filter(el => min < el && el < max).forEach(el => (obj[el] = el));
    }

    setPrivateMarks({ [min]: min, ...obj, [max]: max });
  }, [min, max, marks]);

  return { privateMarks };
};
