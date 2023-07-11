import { extractDataTestProps } from '@sbercloud/uikit-product-utils';

import { Variant } from './constants';

export function getClosureProps(variant: Variant) {
  switch (variant) {
    case Variant.Aggressive: {
      return {
        shouldCloseOnOverlayClick: false,
        shouldCloseOnEsc: false,
      };
    }

    case Variant.Forced: {
      return {
        shouldCloseOnOverlayClick: false,
        shouldCloseOnEsc: false,
      };
    }

    default: {
      return {
        shouldCloseOnOverlayClick: true,
        shouldCloseOnEsc: true,
      };
    }
  }
}

export const getDataTestAttributes = (rest: unknown) => {
  const dataTestProps = extractDataTestProps(rest);

  return Object.keys(dataTestProps).reduce((acc, key) => {
    const newKey = key.replace('data-', '');
    acc[newKey] = dataTestProps[key];
    return acc;
  }, {});
};
