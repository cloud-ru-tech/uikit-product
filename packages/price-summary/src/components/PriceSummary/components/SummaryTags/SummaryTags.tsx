import { PromoTagPredefined } from '@cloud-ru/uikit-product-promo-tag-predefined';
import { WithLayoutType } from '@cloud-ru/uikit-product-utils';

import { CoveredByGrantLabel } from '../CoveredByGrantLabel';
import styles from './styles.module.scss';

export type SummaryTagsProps = WithLayoutType<{
  freeTier?: boolean;
  onFreeTierClick?: () => void;
  coveredByGrants?: boolean;
}>;

export function SummaryTags({ freeTier, onFreeTierClick, coveredByGrants, layoutType }: SummaryTagsProps) {
  if (!freeTier && coveredByGrants === undefined) {
    return null;
  }

  return (
    <div className={styles.tags}>
      {coveredByGrants !== undefined && <CoveredByGrantLabel covered={coveredByGrants} layoutType={layoutType} />}
      {freeTier && <PromoTagPredefined variant='freeTier' onClick={onFreeTierClick} />}
    </div>
  );
}
