import cn from 'classnames';

import { extractSupportProps } from '@sbercloud/uikit-product-utils';
import { CollapseBlockPrimaryProps } from '@snack-uikit/accordion';

import { CollapseBlockHeaderContainer, CollapseBlockPrivate } from '../../helperComponents';
import { useExpanded } from '../../hooks';
import styles from './styles.module.scss';

export function MobileCollapseBlockPrimary({
  id,
  header,
  children,
  actions,
  className,
  outline,
  shape = 'round',
  ...rest
}: CollapseBlockPrimaryProps) {
  const { isExpanded, isExpandedDebounced, handleToggleExpanded } = useExpanded(id);

  return (
    <CollapseBlockPrivate
      className={cn(
        styles.containerBase,
        { [styles.container]: !outline, [styles.containerOutline]: outline },
        className,
      )}
      shape={shape}
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
