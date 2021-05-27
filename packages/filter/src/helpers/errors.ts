export const notValid = (): void => {
  throw new Error('Filter component: value is is not valid, expected TFilterValueType[] | string');
};
