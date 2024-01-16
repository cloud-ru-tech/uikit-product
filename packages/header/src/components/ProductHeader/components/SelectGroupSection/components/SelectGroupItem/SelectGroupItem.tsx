import { forwardRef, KeyboardEventHandler, MouseEvent, MouseEventHandler, ReactElement, useState } from 'react';

import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { Avatar } from '@snack-uikit/avatar';
import { ButtonFunction } from '@snack-uikit/button';
import { Droplist } from '@snack-uikit/droplist';
import { MoreSVG } from '@snack-uikit/icons';
import { Tooltip } from '@snack-uikit/tooltip';
import { TruncateString } from '@snack-uikit/truncate-string';

import styles from './styles.modules.scss';

export type Action = {
  option: string;
  icon?: ReactElement;
  onClick(): void;
};

export type SelectGroupItemProps = WithSupportProps<{
  name: string;
  selected: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
  onMouseDown?: MouseEventHandler<HTMLDivElement>;
  onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
  logo?: ReactElement;
  actions?: Action[];
}>;

export const SelectGroupItem = forwardRef<HTMLDivElement, SelectGroupItemProps>(
  ({ name, selected, onClick, onMouseDown, onKeyDown, logo, actions, ...rest }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [hovered, setHovered] = useState(false);
    const showActionsButton = actions && actions.length > 0 && hovered;

    const handleEnter = () => setHovered(true);
    const handleLeave = () => setHovered(false);

    const handleActionListItemClick = (action: Action) => () => {
      action.onClick();
      setIsOpen(false);
      handleLeave();
    };

    const handleActionButtonClick = (action: Action) => (event: MouseEvent) => {
      event.stopPropagation();
      action.onClick();
    };

    return (
      <div
        className={styles.item}
        onMouseDown={onMouseDown}
        onKeyDown={onKeyDown}
        data-selected={selected || undefined}
        tabIndex={0}
        role={'button'}
        onClick={onClick}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        ref={ref}
        {...extractSupportProps(rest)}
      >
        {logo ?? <Avatar size='xs' name={name} showTwoSymbols shape='square' />}

        <span
          className={styles.itemLabel}
          data-has-action-button={Boolean(showActionsButton) || undefined}
          data-test-id='header__select-group-item-label'
        >
          <TruncateString text={name} placement='bottom' />
        </span>

        {showActionsButton &&
          (actions.length === 1 ? (
            <Tooltip tip={actions[0].option}>
              <ButtonFunction
                icon={actions[0].icon}
                onClick={handleActionButtonClick(actions[0])}
                size='xs'
                data-test-id='header__select-group-item-actions-button'
              />
            </Tooltip>
          ) : (
            <Droplist
              open={isOpen}
              onOpenChange={setIsOpen}
              triggerElement={
                <ButtonFunction icon={<MoreSVG />} size='xs' data-test-id='header__select-group-item-actions-button' />
              }
              placement='bottom-end'
            >
              {actions.map(action => (
                <Droplist.ItemSingle
                  {...action}
                  key={action.option}
                  onClick={handleActionListItemClick(action)}
                  data-test-id='header__select-group-item-actions-option'
                />
              ))}
            </Droplist>
          ))}
      </div>
    );
  },
);
