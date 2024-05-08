import { KebabSVG } from '@sbercloud/uikit-product-icons';
import { ButtonFunction } from '@snack-uikit/button';
import { Droplist } from '@snack-uikit/list';

import { stopPropagationClick } from '../../../utils';
import styles from '../styles.module.scss';
import { Item } from '../types';

type GroupSectionItemDroplistProps = {
  actions: NonNullable<Item['actions']>;
  onItemClick?(): void;
  dataTestId: string;
};

export function GroupSectionItemDroplist({ actions, onItemClick, dataTestId }: GroupSectionItemDroplistProps) {
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div onMouseDown={stopPropagationClick} className={styles.droplistTriggerWrap}>
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
          data-test-id={`${dataTestId}-droplist-trigger`}
        />
      </Droplist>
    </div>
  );
}
