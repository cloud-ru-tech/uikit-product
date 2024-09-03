import cn from 'classnames';
import { forwardRef, PropsWithChildren, useEffect, useState } from 'react';

import { Headline, HeadlineProps } from '../Headline';
import { PrivateSidebar, PrivateSidebarProps } from '../PrivateSidebar';
import styles from './styles.module.scss';

export type PageServicesProps = PropsWithChildren<
  Pick<HeadlineProps, 'title' | 'actions' | 'subHeader' | 'afterHeadline' | 'beforeHeadline'> & {
    className?: string;
    sidebar?: PrivateSidebarProps;
  }
>;

const GLOBAL_CONTAINER_ID = 'single-spa-wrapper';

export const PageServices = forwardRef<HTMLDivElement, PageServicesProps>(
  ({ children, title, actions, className, sidebar, beforeHeadline, subHeader, afterHeadline }, ref) => {
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
      <div className={cn(styles.wrapper, className)} style={{ height }}>
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
