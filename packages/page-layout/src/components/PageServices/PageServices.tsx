import cn from 'classnames';
import { forwardRef, PropsWithChildren, useEffect, useState } from 'react';

import { WithSupportProps } from '@cloud-ru/uikit-product-utils';
import { extractSupportProps } from '@snack-uikit/utils';

import { Headline, HeadlineProps } from '../Headline';
import { PageSidebar, PageSidebarProps } from '../PageSidebar';
import styles from './styles.module.scss';

export type PageServicesProps = WithSupportProps<
  PropsWithChildren<
    Pick<HeadlineProps, 'title' | 'actions' | 'subHeader' | 'afterHeadline' | 'beforeHeadline' | 'truncateTitle'> & {
      className?: string;
      sidebar?: PageSidebarProps;
      autoHeight?: boolean;
      limitContentMaxWidth?: boolean;
    }
  >
>;

const GLOBAL_CONTAINER_ID = 'single-spa-wrapper';

export const PageServices = forwardRef<HTMLDivElement, PageServicesProps>(
  (
    {
      children,
      title,
      actions,
      className,
      sidebar,
      beforeHeadline,
      subHeader,
      afterHeadline,
      truncateTitle,
      autoHeight,
      limitContentMaxWidth,
      ...rest
    },
    ref,
  ) => {
    const [height, setHeight] = useState(0);

    useEffect(() => {
      if (autoHeight) return;

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
    }, [autoHeight]);

    return (
      <div
        className={cn(styles.wrapper, className)}
        {...(!autoHeight && { style: { height } })}
        {...extractSupportProps(rest)}
      >
        <div className={styles.tempContainer} ref={ref}>
          <div className={styles.container} data-limited={limitContentMaxWidth}>
            <Headline
              title={title}
              actions={actions}
              beforeHeadline={beforeHeadline}
              afterHeadline={afterHeadline}
              subHeader={subHeader}
              truncateTitle={truncateTitle}
            />

            <div className={styles.childWrapper}>{children}</div>
          </div>
        </div>
        {sidebar && (
          <div className={styles.sidebar}>
            <PageSidebar {...sidebar} />
          </div>
        )}
      </div>
    );
  },
);
