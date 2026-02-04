import cn from 'classnames';

import { EvolutionComputeSVG, PublicIpSVG } from '@cloud-ru/uikit-product-icons';
import { TruncateString } from '@snack-uikit/truncate-string';
import { Typography } from '@snack-uikit/typography';

import styles from './styled.module.scss';

export type VmInfoRowProps = {
  vmName: string;
  ip: string;
};

export function VmInfoRow({ vmName, ip }: VmInfoRowProps) {
  return (
    <div className={styles.container}>
      <div className={cn(styles.infoItem, styles.vmRow)}>
        <div className={styles.svgWrapper}>
          <EvolutionComputeSVG size={16} />
        </div>

        <Typography.SansBodyS className={styles.vmTitle}>
          <TruncateString text={vmName} />
        </Typography.SansBodyS>
      </div>

      <div className={cn(styles.infoItem, styles.ipRow)}>
        <PublicIpSVG size={16} />

        <Typography.SansBodyS>{ip}</Typography.SansBodyS>
      </div>
    </div>
  );
}
