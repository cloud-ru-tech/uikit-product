import { forwardRef, ReactNode } from 'react';

import { LAYOUT_TYPE } from '@sbercloud/uikit-product-utils';

import { useCalculatorContext } from '../../contexts';
import styles from './styles.module.scss';

type HeaderContainerProps = {
  children: ReactNode;
  dataTestId?: string;
};

export const HeaderContainer = forwardRef<HTMLDivElement, HeaderContainerProps>(
  ({ children, dataTestId }: HeaderContainerProps, ref) => {
    const { layoutType } = useCalculatorContext();

    const isTablet = layoutType !== LAYOUT_TYPE.Desktop && layoutType !== LAYOUT_TYPE.DesktopSmall;
    const isMobile = layoutType === LAYOUT_TYPE.Mobile;

    return (
      <div
        className={styles.header}
        data-mobile={isMobile || undefined}
        data-tablet={isTablet || undefined}
        ref={ref}
        data-test-id={dataTestId}
      >
        {children}
      </div>
    );
  },
);
