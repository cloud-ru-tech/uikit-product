import cn from 'classnames';

import { extractSupportProps } from '@cloud-ru/uikit-product-utils';
import { CollapseBlockSecondaryProps } from '@snack-uikit/accordion';

import { CollapseBlockHeaderContainer, CollapseBlockPrivate } from '../../helperComponents';
import { useExpanded } from '../../hooks';
import styles from './styles.module.scss';

export function MobileCollapseBlockSecondary({
  header,
  children,
  id,
  actions,
  className,
  ...rest
}: CollapseBlockSecondaryProps) {
  const { isExpanded, isExpandedDebounced, handleToggleExpanded } = useExpanded(id);

  return (
    <CollapseBlockPrivate
      className={cn(styles.container, className)}
      header={
        <CollapseBlockHeaderContainer expanded={isExpanded} toggleExpanded={handleToggleExpanded} actions={actions}>
          {header}
        </CollapseBlockHeaderContainer>
      }
      expanded={isExpanded}
      expandedDebounced={isExpandedDebounced}
      {...extractSupportProps(rest)}
    >
      {children}
    </CollapseBlockPrivate>
  );
}
