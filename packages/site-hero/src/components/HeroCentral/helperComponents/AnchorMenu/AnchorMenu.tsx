import { CSSProperties } from 'react';

import { WithLayoutType } from '@cloud-ru/uikit-product-utils';

import styles from './styles.module.scss';

export type AnchorTypeProps = {
  id: string;
  text: string;
  onClick: () => void;
};

type AnchorMenuProps = WithLayoutType<{
  anchorsList?: AnchorTypeProps[];
  topPosition?: number;
  floating?: boolean;
  visible?: boolean;
}>;

export function AnchorMenu({ anchorsList, layoutType, topPosition, floating, visible }: AnchorMenuProps) {
  if (!anchorsList || anchorsList.length === 0) return null;

  const list = (
    <ul className={styles.list} data-layout-type={layoutType}>
      {anchorsList.map(item => (
        <li
          key={item.id}
          onClick={item.onClick}
          className={styles.item}
          role='tab'
          tabIndex={floating && !visible ? -1 : 0}
        >
          {item.text}
        </li>
      ))}
    </ul>
  );

  if (!floating) {
    return list;
  }

  return (
    <div
      className={styles.floatingBar}
      style={
        topPosition && topPosition >= 0 ? ({ '--anchor-menu-top': `${topPosition}px` } as CSSProperties) : undefined
      }
      data-layout-type={layoutType}
      data-visible={visible || undefined}
      aria-hidden={!visible}
    >
      <div className={styles.listWrapper}>{list}</div>
    </div>
  );
}
