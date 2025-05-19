import { KebabSVG } from '@sbercloud/uikit-product-icons';
import { ButtonFunction } from '@snack-uikit/button';
import { BaseItemProps, Droplist } from '@snack-uikit/list';

import { stopPropagationClick } from '../../utils';
import styles from './styles.module.scss';

export type ItemDroplistProps = {
  actions: BaseItemProps[];
  onItemClick?(): void;
  dataTestId: string;
  open?: boolean;
  onOpenChange?(open: boolean): void;
};

export function ItemDroplist({ open, onOpenChange, actions, onItemClick, dataTestId }: ItemDroplistProps) {
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div onMouseDown={stopPropagationClick} className={styles.droplistTriggerWrap}>
      <Droplist
        open={open}
        onOpenChange={onOpenChange}
        items={actions.map(action => ({
          ...action,
          onClick(e) {
            action.onClick?.(e);
            onItemClick?.();
          },
        }))}
        placement='bottom-end'
        data-test-id={`${dataTestId}__droplist`}
      >
        <ButtonFunction
          size='xs'
          icon={<KebabSVG />}
          onClick={stopPropagationClick}
          data-test-id={`${dataTestId}__droplist-trigger`}
        />
      </Droplist>
    </div>
  );
}
