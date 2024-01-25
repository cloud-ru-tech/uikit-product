import { PlaceholderSVG } from '@snack-uikit/icons';
import { Typography } from '@snack-uikit/typography';

import styles from './styles.module.scss';

type SidebarProps = {
  option?: string;
};

export function Sidebar({ option }: SidebarProps) {
  return (
    <>
      {new Array(8).fill(0).map((_, key) => (
        <div className={styles.wrapper} key={key}>
          <div className={styles.item}>
            <PlaceholderSVG size={24} />
            {option && (
              <Typography.SansLabelL>
                {option} {key}
              </Typography.SansLabelL>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
