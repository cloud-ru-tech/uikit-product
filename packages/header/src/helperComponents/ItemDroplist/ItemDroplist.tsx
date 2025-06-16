import { MouseEvent } from 'react';

import { KebabSVG } from '@sbercloud/uikit-product-icons';
import { ButtonFunction } from '@snack-uikit/button';
import { BaseItemProps, Droplist, GroupItemProps } from '@snack-uikit/list';

import styles from './styles.module.scss';

const preventDefaultAndPropagationClick = (e: MouseEvent) => {
  e.stopPropagation();
  e.preventDefault();
};

export type ItemDroplistProps = {
  actions: BaseItemProps[];
  onItemClick?(): void;
  dataTestId: string;
  open?: boolean;
  onOpenChange?(open: boolean): void;
  pinTop?: (BaseItemProps | GroupItemProps)[];
};

export function ItemDroplist({ open, onOpenChange, actions, onItemClick, pinTop, dataTestId }: ItemDroplistProps) {
  return (
    <div className={styles.droplistTriggerWrap}>
      <Droplist
        open={open}
        onOpenChange={onOpenChange}
        pinTop={pinTop}
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
          onClick={preventDefaultAndPropagationClick}
          data-test-id={`${dataTestId}__droplist-trigger`}
        />
      </Droplist>
    </div>
  );
}
