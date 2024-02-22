import { ButtonFunction } from '@snack-uikit/button';
import { KebabSVG } from '@snack-uikit/icons';
import { Droplist } from '@snack-uikit/list';

import { stopPropagationClick } from '../../utils';
import styles from './styles.module.scss';
import { Item } from './types';

type GroupSectionItemDroplistProps = {
  actions: NonNullable<Item['actions']>;
  onItemClick?(): void;
  dataTestId: string;
};

export function GroupSectionItemDroplist({ actions, onItemClick, dataTestId }: GroupSectionItemDroplistProps) {
  return (
    <Droplist
      items={actions.map(action => ({
        ...action,
        onClick(e) {
          action.onClick?.(e);
          onItemClick?.();
        },
      }))}
    >
      <ButtonFunction
        size='xs'
        icon={<KebabSVG />}
        onClick={stopPropagationClick}
        className={styles.droplistTrigger}
        data-test-id={`${dataTestId}-droplist-trigger`}
      />
    </Droplist>
  );
}
