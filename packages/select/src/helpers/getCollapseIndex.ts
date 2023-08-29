export const getCollapseIndex = (value: number, maxValue?: number): number | undefined => {
  if (maxValue !== undefined && value - maxValue > -1) {
    return maxValue;
  }
};
