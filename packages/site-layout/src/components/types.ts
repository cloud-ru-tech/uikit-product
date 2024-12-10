import { ReactNode } from 'react';

import { WithSupportProps } from '@sbercloud/uikit-product-utils';

export type LayoutProps = WithSupportProps<{
  /** Слот под основной контент, рекомендуется использовать helper компоненты Layout.Header, Layout.Footer, etc. */
  children: ReactNode;
  /** Слот под опциональные meta и всё что должно быть вне зарендеренной страницы */
  meta?: ReactNode;
  className?: string;
}>;
