import cn from 'classnames';
import { PropsWithChildren, useEffect, useState } from 'react';

import { Headline, HeadlineProps } from '../Headline';
import { PrivateSidebar, PrivateSidebarProps } from '../PrivateSidebar';
import styles from './styles.module.scss';

export type PageServicesProps = PropsWithChildren<
  Pick<HeadlineProps, 'title' | 'actions' | 'status' | 'subHeader' | 'prefixButton'> & {
    className?: string;
    sidebar?: PrivateSidebarProps;
  }
>;

const GLOBAL_CONTAINER_ID = 'single-spa-wrapper';

export function PageServices({
  children,
  title,
  actions,
  className,
  sidebar,
  status,
  subHeader,
  prefixButton,
}: PageServicesProps) {
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
      <div className={styles.tempContainer}>
        <div className={styles.container}>
          <Headline title={title} actions={actions} prefixButton={prefixButton} status={status} subHeader={subHeader} />

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
}
