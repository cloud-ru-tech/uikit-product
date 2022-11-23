import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import useTransition from 'react-transition-state';

import { TRANSITION_TIMING } from '../../constants';
import { useSidebarContext } from '../../context';
import { isItemAccordion } from '../../helpers';
import { useNestedActive } from '../../hooks';
import { SidebarItemProps } from '../../types';
import { SidebarItem } from '../SidebarItem';
import * as S from './styled';

type SidebarAccordionProps = {
  item: SidebarItemProps;
  recalculateParentHeight?(childDiff?: number): void;
  accordionLevel: number;
  isMobile?: boolean;
};

export function SidebarAccordion({
  item,
  recalculateParentHeight,
  accordionLevel = 0,
  isMobile,
}: SidebarAccordionProps) {
  const { handleItemClick, active } = useSidebarContext();
  const isAccordion = isItemAccordion(item, isMobile);

  const shouldBeOpen = useNestedActive(item, isMobile);
  const [isOpen, setOpen] = useState(shouldBeOpen);
  const maxHeightRef = useRef(0);
  const [maxHeight, setMaxHeight] = useState<number>(0);
  const accordionRef = useRef<HTMLDivElement>(null);

  const [state, toggle] = useTransition({
    timeout: TRANSITION_TIMING.accordionFolding,
    initialEntered: isOpen || undefined,
  });

  const recalculateOwnHeight = useCallback(
    (childDiff = 0) => {
      setMaxHeight(maxHeight => {
        if (!accordionRef.current) return maxHeight;
        if (!isOpen) {
          return 0;
        }
        if (maxHeight === 0) {
          return accordionRef.current.scrollHeight + childDiff;
        }
        return maxHeight + childDiff;
      });
    },
    [isOpen],
  );

  useEffect(() => {
    if (!recalculateParentHeight || maxHeight === maxHeightRef.current) return;

    recalculateParentHeight(maxHeight - maxHeightRef.current);
    maxHeightRef.current = maxHeight;
  }, [maxHeight, recalculateParentHeight]);

  useEffect(() => {
    setOpen(shouldBeOpen);
    toggle(shouldBeOpen);
  }, [shouldBeOpen, active]);

  useEffect(() => {
    recalculateOwnHeight();
  }, [recalculateOwnHeight]);

  function handleClick(e: MouseEvent) {
    if (isAccordion) {
      e.preventDefault();

      setOpen(open => !open);
      toggle();
      return;
    }

    handleItemClick(item)(e);
  }

  return (
    <S.Accordion>
      <SidebarItem
        {...item}
        showArrow={isAccordion}
        onClick={handleClick}
        level={accordionLevel}
        isOpen={isOpen}
        isMobile={isMobile}
      />

      {item.nestedList?.length && (
        <S.AccordionFoldable
          ref={accordionRef}
          maxHeight={accordionRef.current ? maxHeight : undefined}
          data-mobile={isMobile || undefined}
          data-transition-status={state.status}
        >
          {item.nestedList?.map(nested =>
            nested.items.map(nestedItem => (
              <SidebarAccordion
                key={nestedItem.label}
                recalculateParentHeight={recalculateOwnHeight}
                item={nestedItem}
                accordionLevel={accordionLevel + 1}
                isMobile={isMobile}
              />
            )),
          )}
        </S.AccordionFoldable>
      )}
    </S.Accordion>
  );
}
