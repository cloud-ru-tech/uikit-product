export const isStr = (v: unknown): v is string => typeof v === 'string';

export const isFn = (v: unknown): v is () => void => typeof v === 'function';

export const parseClassName = (v: unknown) => (isStr(v) || isFn(v) ? v : null);
