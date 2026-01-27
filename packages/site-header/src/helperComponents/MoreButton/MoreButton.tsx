import cn from 'classnames';
import { useState } from 'react';

import { MoreSVG } from '@cloud-ru/uikit-product-icons';
import { Dropdown } from '@snack-uikit/dropdown';

import { LinkItem } from '../../components/HeaderItems/types';
import { LinkItemHeader } from '../LinkItemHeader';
import styles from './styles.module.scss';

type MoreButtonProps = {
  linkItemsArray: LinkItem[];
  activeItemId?: string;
};

export function MoreButton({ linkItemsArray, activeItemId }: MoreButtonProps) {
  const [open, setOpen] = useState(false);
  const onClickOpen = () => {
    setOpen(prev => !prev);
  };

  return (
    <Dropdown
      placement='bottom-start'
      open={open}
      outsideClick={() => {
        onClickOpen();
        return false;
      }}
      content={
        <div className={styles.tagRowDropListScroll}>
          {linkItemsArray.map(item => (
            <div
              key={item.id}
              className={cn(
                styles.rowLinkMore,
                {
                  [styles.hovered]: !item.href,
                  [styles.active]: item.id === activeItemId && !item.href,
                },
                item.className,
              )}
              {...item.dataAttributes}
            >
              <LinkItemHeader
                label={item.label}
                onClick={() => {
                  item.onClick && item.onClick();
                  onClickOpen();
                }}
                href={item.href}
                withoutHover
              />
            </div>
          ))}
        </div>
      }
    >
      <button className={styles.button} onClick={onClickOpen}>
        <MoreSVG />
      </button>
    </Dropdown>
  );
}
