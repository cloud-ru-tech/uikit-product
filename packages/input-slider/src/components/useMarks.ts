import { MarkObj } from 'rc-slider/lib/Marks';
import { useEffect, useMemo, useState } from 'react';

import { InputSliderBaseProps, MarksPlacement } from './types';

const prepareLinearMarks = (marks: Required<InputSliderBaseProps>['marks']): Record<string, MarkObj> => {
  const sortedMarks = (Array.isArray(marks) ? marks.slice() : Object.keys(marks))
    .map(Number)
    .sort((num1, num2) => num1 - num2);
  const markPositionStep = 100 / (sortedMarks.length - 1);

  const getMark = (index: number) => {
    const style = Array.isArray(marks) ? undefined : marks[sortedMarks[index]]?.style;
    return { label: sortedMarks[index], style };
  };

  const linearMarks: Record<string, MarkObj> = {};
  for (let i = 0; i < sortedMarks.length - 1; i++) {
    linearMarks[i * markPositionStep] = getMark(i);
  }
  if (sortedMarks.length > 1) {
    linearMarks[100] = getMark(sortedMarks.length - 1);
  }

  return linearMarks;
};

export const useMarks = (
  min: number,
  max: number,
  marks?: InputSliderBaseProps['marks'],
  marksPlacementType?: MarksPlacement,
) => {
  const [privateMarks, setPrivateMarks] = useState<Record<string, MarkObj>>({});

  useEffect(() => {
    const filteredMarks: Required<InputSliderBaseProps>['marks'] = {};

    filteredMarks[min] = { label: min };
    filteredMarks[max] = { label: max };
    if (marks) {
      if (Array.isArray(marks)) {
        marks.filter(el => min < el && el < max).forEach(el => (filteredMarks[el] = { label: el }));
      } else {
        Object.keys(marks)
          .filter(el => min <= Number(el) && Number(el) <= max)
          .forEach(el => (filteredMarks[el] = marks[el]));
      }
    }

    const formattedMarks =
      marksPlacementType === MarksPlacement.LinearOnlyMarks ? prepareLinearMarks(filteredMarks) : filteredMarks;

    setPrivateMarks(formattedMarks);
  }, [min, max, marks, marksPlacementType]);

  const privateMarksList = useMemo(
    () =>
      Object.keys(privateMarks)
        .map(Number)
        .sort((mark1, mark2) => mark1 - mark2),
    [privateMarks],
  );

  const privateMarksValuesList = useMemo(
    () =>
      Object.values(privateMarks)
        .map(mark => Number(mark.label))
        .sort((mark1, mark2) => mark1 - mark2),
    [privateMarks],
  );

  return { privateMarks, privateMarksList, privateMarksValuesList };
};
