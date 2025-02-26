import { forwardRef, ReactNode, useCallback } from 'react';

import { TitleClickable } from '@sbercloud/uikit-product-title-clickable';

import { LinksGroupTitle } from '../../../../types';
import styles from './styles.module.scss';

type GroupCardProps = {
  id: string;
  title: LinksGroupTitle;
  children: ReactNode;
  mobile?: boolean;
  onClose?: () => void;
};

export const GroupCard = forwardRef<HTMLDivElement, GroupCardProps>(({ id, title, children, mobile, onClose }, ref) => {
  const handleClick = useCallback(
    (evt: React.MouseEvent<HTMLAnchorElement>) => {
      if (title.onClick) {
        title.onClick(evt);
        evt.preventDefault();
      }
      onClose?.();
    },
    [onClose, title],
  );

  return (
    <div className={styles.card} id={id} ref={ref} data-test-id={`header__drawer-menu__group-card-${id}`}>
      {!title.onClick ? (
        <span className={styles.cardTitle}>{title.text}</span>
      ) : (
        <TitleClickable title={title.text} href='#' onClick={handleClick} />
      )}

      <div className={styles.cardBody} data-mobile={mobile || undefined}>
        {children}
      </div>
    </div>
  );
});
