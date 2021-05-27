import { TFilterValueType } from './types';

export const parseQuery = (val: string): TFilterValueType[] => JSON.parse(decodeURIComponent(val as string));
