import { WithLayoutType } from '@cloud-ru/uikit-product-utils';

import styles from './styles.module.scss';

export type AnchorTypeProps = {
  id: string;
  text: string;
  onClick: () => void;
};

type AnchorMenuProps = WithLayoutType<{
  anchorsList?: AnchorTypeProps[];
}>;

export function AnchorMenu({ anchorsList, layoutType }: AnchorMenuProps) {
  if (!anchorsList || anchorsList.length === 0) return null;

  return (
    <ul className={styles.root} data-layout-type={layoutType}>
      {anchorsList.map(item => (
        <li key={item.id} onClick={item.onClick} className={styles.item} role='tab' tabIndex={0}>
          {item.text}
        </li>
      ))}
    </ul>
  );
}
