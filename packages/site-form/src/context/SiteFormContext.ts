import { createContext } from 'react';

import { LayoutType } from '@cloud-ru/uikit-product-utils';

import { SiteFormEvents, SiteFormProps } from '../types';

export type SiteFormContextType = Pick<SiteFormEvents, 'onControlClick'> &
  Pick<SiteFormProps, 'getCompanySuggestions'> & {
    layoutType: LayoutType;
  };

export const SiteFormContext = createContext<SiteFormContextType>({
  layoutType: 'desktop',
});
