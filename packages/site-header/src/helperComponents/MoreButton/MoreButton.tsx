import cn from 'classnames';

import { MoreSVG } from '@sbercloud/uikit-product-icons';
import { Dropdown } from '@snack-uikit/dropdown';

import { LinkItem } from '../../components/HeaderItems/types';
import { LinkItemHeader } from '../LinkItemHeader';
import styles from './styles.module.scss';

type MoreButtonProps = {
  linkItemsArray: LinkItem[];
  activeItemId?: string;
};

export function MoreButton({ linkItemsArray, activeItemId }: MoreButtonProps) {
  return (
    <Dropdown
      placement='bottom-start'
      content={
        <div className={styles.tagRowDropListScroll}>
          {linkItemsArray.map(item => (
            <div
              key={item.id}
              className={cn(styles.rowLinkMore, {
                [styles.hovered]: !item.href,
                [styles.active]: item.id === activeItemId && !item.href,
              })}
            >
              <LinkItemHeader label={item.label} onClick={item.onClick} href={item.href} withoutHover />
            </div>
          ))}
        </div>
      }
    >
      <button className={styles.button}>
        <MoreSVG />
      </button>
    </Dropdown>
  );
}
