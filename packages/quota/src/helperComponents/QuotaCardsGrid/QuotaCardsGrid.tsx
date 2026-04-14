import { Scroll } from '@snack-uikit/scroll';

import { QuotaWidgetPropsBase } from '../../types';
import { Grid } from './components/Grid';
import { QuotaError } from './components/QuotaError';
import styles from './styles.module.scss';

type QuotaCardsGridProps = Pick<
  QuotaWidgetPropsBase,
  'quotas' | 'disableSorting' | 'isLoading' | 'isError' | 'onRefresh'
> & {
  isAccordion?: boolean;
  isMobile?: boolean;
};

export function QuotaCardsGrid({
  quotas,
  isLoading,
  isError,
  onRefresh,
  disableSorting = false,
  isAccordion = false,
  isMobile = false,
}: QuotaCardsGridProps) {
  const wrapperAttributes = {
    className: styles.wrapper,
    'data-accordion': isAccordion,
  };

  const gridProps = {
    quotas,
    isLoading,
    disableSorting,
    isAccordion,
    isMobile,
  };

  if (isError) {
    return isMobile ? (
      <QuotaError onRefresh={onRefresh} />
    ) : (
      <div {...wrapperAttributes}>
        <QuotaError onRefresh={onRefresh} />
      </div>
    );
  }

  return isMobile ? (
    <Grid {...gridProps} />
  ) : (
    <Scroll {...wrapperAttributes} size='s'>
      <Grid {...gridProps} />
    </Scroll>
  );
}
