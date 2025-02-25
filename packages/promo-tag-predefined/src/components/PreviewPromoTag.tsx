import { useMemo } from 'react';

import { useTextProvider } from '@sbercloud/uikit-product-utils';
import { PromoTag } from '@snack-uikit/promo-tag';
import { Tooltip, TooltipProps } from '@snack-uikit/tooltip';

import { textProvider, Texts } from '../helpers';
import { PREVIEW_PROMO_TAG_CONTEXT } from './constants';
import styles from './styles.module.scss';
import { PreviewPromoTagContext } from './types';

export type PreviewPromoTagProps = {
  context?: PreviewPromoTagContext;
} & Pick<TooltipProps, 'placement' | 'trigger'>;

export function PreviewPromoTag({ context = PREVIEW_PROMO_TAG_CONTEXT.Service, ...props }: PreviewPromoTagProps) {
  const getText = useTextProvider(textProvider);

  const text = useMemo(() => {
    const textKey = context === PREVIEW_PROMO_TAG_CONTEXT.Functional ? Texts.TooltipFunctional : Texts.TooltipService;
    return getText(textKey);
  }, [context, getText]);

  return (
    <Tooltip tip={text} {...props} className={styles.tooltip} triggerClassName={styles.trigger}>
      <PromoTag text={getText(Texts.Text)} appearance='blue' />
    </Tooltip>
  );
}
