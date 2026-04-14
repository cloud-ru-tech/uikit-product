import { QuotaWidgetCard } from '../../../../components/QuotaWidgetCard';
import { QuotaItem, QuotaWidgetPropsBase } from '../../../../types';
import { getPercent } from '../../../../utils/getPercent';
import { QuotaWidgetCardsSkeleton } from './components/QuotaWidgetCardsSkeleton';
import styles from './styles.module.scss';

function sortQuotas(quotas: QuotaItem[]): QuotaItem[] {
  return [...quotas].sort((first, second) => {
    const percentFirst = getPercent(first);
    const percentSecond = getPercent(second);

    if (percentSecond !== percentFirst) {
      return percentSecond - percentFirst;
    }

    return first.name.localeCompare(second.name);
  });
}

type GridProps = Pick<QuotaWidgetPropsBase, 'quotas' | 'isLoading' | 'disableSorting'> & {
  isAccordion?: boolean;
  isMobile?: boolean;
};

export function Grid({ quotas, isLoading, disableSorting = false, isAccordion = false, isMobile = false }: GridProps) {
  const sortedQuotas = disableSorting ? quotas : sortQuotas(quotas);

  return (
    <div className={styles.grid} data-single={(quotas.length <= 1 && !isLoading) || isMobile || isAccordion}>
      <QuotaWidgetCardsSkeleton isLoading={isLoading}>
        {sortedQuotas.map((quota, index) => (
          <QuotaWidgetCard key={index} quota={quota} />
        ))}
      </QuotaWidgetCardsSkeleton>
    </div>
  );
}
