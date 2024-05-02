import cn from 'classnames';
import { PropsWithChildren, ReactNode, useEffect, useState } from 'react';

import { Headline, HeadlineProps } from '../Headline';
import { PrivateSidebar, PrivateSidebarProps } from '../PrivateSidebar';
import styles from './styles.module.scss';

export type PageServicesProps = PropsWithChildren<
  Pick<HeadlineProps, 'title' | 'actions' | 'status' | 'subHeader' | 'prefixButton'> & {
    className?: string;
    sidebar?: PrivateSidebarProps;
    /** Временный слот для крошек до переезда на целевую историю в хедере */
    tempTopSlot?: ReactNode;
  }
>;

const GLOBAL_CONTAINER_ID = 'single-spa-wrapper';

export function PageServices({
  children,
  title,
  actions,
  className,
  sidebar,
  tempTopSlot,
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
            const height = entity.target.clientHeight;
            setHeight(height);
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
          <div>
            {tempTopSlot}
            <Headline
              title={title}
              actions={actions}
              prefixButton={prefixButton}
              status={status}
              subHeader={subHeader}
            />
          </div>
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
