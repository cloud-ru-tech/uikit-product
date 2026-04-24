import { Skeleton } from '@snack-uikit/skeleton';

import { WidgetProps } from '../../components/Widget/types';
import { Actions } from '../Actions';
import styles from './styles.module.scss';

export function ControlBlock({
  actions,
  actionsChildren,
  controlChildren,
  wide,
  state,
  layoutType,
}: Pick<WidgetProps, 'actions' | 'actionsChildren' | 'controlChildren' | 'wide' | 'state' | 'layoutType'>) {
  if (!controlChildren && !wide) return null;

  const content =
    state === 'loading'
      ? !wide && <Skeleton loading width={wide ? 120 : '100%'} height={32} borderRadius={8} />
      : controlChildren;

  return (
    <div className={styles.controlWrapper} data-mobile={!wide || undefined}>
      {content}
      {wide && (
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
