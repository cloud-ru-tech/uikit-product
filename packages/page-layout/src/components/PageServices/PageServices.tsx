import cn from 'classnames';
import { forwardRef, PropsWithChildren, useEffect, useState } from 'react';

import { WithSupportProps } from '@sbercloud/uikit-product-utils';
import { extractSupportProps } from '@snack-uikit/utils';

import { Headline, HeadlineProps } from '../Headline';
import { PrivateSidebar, PrivateSidebarProps } from '../PrivateSidebar';
import styles from './styles.module.scss';

export type PageServicesProps = WithSupportProps<
  PropsWithChildren<
    Pick<HeadlineProps, 'title' | 'actions' | 'subHeader' | 'afterHeadline' | 'beforeHeadline'> & {
      className?: string;
      sidebar?: PrivateSidebarProps;
    }
  >
>;

const GLOBAL_CONTAINER_ID = 'single-spa-wrapper';

export const PageServices = forwardRef<HTMLDivElement, PageServicesProps>(
  ({ children, title, actions, className, sidebar, beforeHeadline, subHeader, afterHeadline, ...rest }, ref) => {
    const [height, setHeight] = useState(0);

    useEffect(() => {
      const container = document.getElementById(GLOBAL_CONTAINER_ID);

      if (container) {
        const observer = new ResizeObserver(entities =>
          entities.forEach(entity => {
            if (entity.target === container) {
              const [{ blockSize }] = entity.contentBoxSize;
              setHeight(Math.floor(blockSize));
            }
          }),
        );

        observer.observe(container);

        return () => observer.disconnect();
      }
    }, []);

    return (
      <div className={cn(styles.wrapper, className)} style={{ height }} {...extractSupportProps(rest)}>
        <div className={styles.tempContainer} ref={ref}>
          <div className={styles.container}>
            <Headline
              title={title}
              actions={actions}
              beforeHeadline={beforeHeadline}
              afterHeadline={afterHeadline}
              subHeader={subHeader}
            />

            <div className={styles.childWrapper}>{children}</div>
          </div>
        </div>
        {sidebar && (
          <div className={styles.sidebar}>
            <PrivateSidebar {...sidebar} />
          </div>
        )}
      </div>
    );
  },
);
