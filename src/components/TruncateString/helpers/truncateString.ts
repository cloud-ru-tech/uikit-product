export type MeasurementsType = {
  component: number;
  ellipsis: number;
  text: number;
};

export type TruncateStringArgs = {
  text: string;
  ellipsisString: string;
  measurements: MeasurementsType;
  leftPercentage: number;
};

export const truncateString = ({
  text,
  ellipsisString,
  measurements,
  leftPercentage = 50,
}: TruncateStringArgs): string => {
  if (measurements.text > measurements.component) {
    const size = (percentage: number): number =>
      (measurements.component - measurements.ellipsis) * (percentage / 100);

    const portion = (size: number): number =>
      Math.floor((text.length * size) / measurements.text);

    const left = text.slice(0, Math.max(0, portion(size(leftPercentage))));

    const right = text.slice(
      text.length - portion(size(100 - leftPercentage)),
      text.length,
    );

    return `${left}${ellipsisString}${right}`;
  }

  return text;
};
