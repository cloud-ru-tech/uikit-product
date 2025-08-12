import { extractSupportProps } from '@sbercloud/uikit-product-utils';
import { AccordionProps } from '@snack-uikit/accordion';
import { ToggleGroup } from '@snack-uikit/toggles';

export function Accordion({
  children,
  expanded,
  onExpandedChange,
  expandedDefault,
  selectionMode = 'single',
  className,
  ...rest
}: AccordionProps) {
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <ToggleGroup
      value={expanded}
      defaultValue={expandedDefault}
      onChange={onExpandedChange}
      selectionMode={selectionMode}
    >
      <div className={className} {...extractSupportProps(rest)}>
        {children}
      </div>
    </ToggleGroup>
  );
}
