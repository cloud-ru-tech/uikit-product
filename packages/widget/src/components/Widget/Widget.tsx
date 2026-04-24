import cn from 'classnames';

import { TitleClickable } from '@cloud-ru/uikit-product-title-clickable';
import { Skeleton } from '@snack-uikit/skeleton';
import { extractSupportProps } from '@snack-uikit/utils';

import { Actions, Content, ControlBlock } from '../../helperComponents';
import styles from './styles.module.scss';
import { WidgetProps } from './types';

export function Widget({
  header,
  children,
  actions = [],
  wide: wideProp = false,
  state = 'default',
  loadingState,
  errorState,
  className,
  layoutType,
  actionsChildren,
  controlChildren,
  ...rest
}: WidgetProps) {
  const isMobile = layoutType === 'mobile';
  const wide = wideProp && !isMobile;

  return (
    <div className={cn(styles.widget, className)} {...extractSupportProps(rest)}>
      <div
        className={styles.widgetHeader}
        data-mobile={!wide || undefined}
        data-loading={state === 'loading' || undefined}
      >
        {state === 'loading' ? (
          <div className={styles.skeletonHeader}>
            <Skeleton loading width={wide ? 120 : '100%'} height={32} borderRadius={8} />
          </div>
        ) : (
          <TitleClickable
            fullWidth={isMobile || !wideProp}
            {...header}
            className={cn(styles.titleClickable, header.className)}
          />
        )}

        <ControlBlock
          actions={actions}
          actionsChildren={actionsChildren}
          controlChildren={controlChildren}
          wide={wide}
          state={state}
          layoutType={layoutType}
        />
      </div>

      <div className={styles.widgetContent}>
        <Content state={state} loadingState={loadingState} errorState={errorState} layoutType={layoutType}>
          {children}
        </Content>
      </div>

      {!wide && (
        <Actions
          actions={actions}
          actionsChildren={actionsChildren}
          wide={wide}
          state={state}
          layoutType={layoutType}
        />
      )}
    </div>
  );
}
