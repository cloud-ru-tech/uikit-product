import { error } from '@sbercloud/uikit-product-utils';

export const notReachable = (never: never): null => {
  error(true, JSON.stringify(never));
  return null;
};
