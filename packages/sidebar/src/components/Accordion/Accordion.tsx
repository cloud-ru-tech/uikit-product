import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import useTransition from 'react-transition-state';

import { useSidebarContext } from '../../contexts';
import { isItemAccordion } from '../../helpers';
import { useNestedActive } from '../../hooks';
import { SidebarItem } from '../../types';
import { ListItem } from '../ListItem';
import { TRANSITION_TIMING } from '../Sidebar/constants';
import * as S from './styled';

type AccordionProps = {
  item: SidebarItem;
  recalculateParentHeight?(childDiff?: number): void;
  accordionLevel: number;
  isMobile?: boolean;
};

export function Accordion({ item, recalculateParentHeight, accordionLevel = 0, isMobile }: AccordionProps) {
  const { handleItemClick, active } = useSidebarContext();
  const isAccordion = isItemAccordion(item, isMobile);
  const shouldBeOpen = useNestedActive(item, isMobile);
  const isOpenedByDefault = shouldBeOpen || Boolean(isAccordion && item.isDefaultOpen);
  const [isOpen, setOpen] = useState(shouldBeOpen);
  const [maxHeight, setMaxHeight] = useState<number>(0);
  const maxHeightRef = useRef(0);
  const accordionRef = useRef<HTMLDivElement>(null);

  const [state, toggle] = useTransition({
    timeout: TRANSITION_TIMING.accordionFolding,
    initialEntered: isOpen || undefined,
  });

  const recalculateOwnHeight = useCallback(
    (childDiff = 0) => {
      setMaxHeight(maxHeight => {
        if (!accordionRef.current) {
          return maxHeight;
        }

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
    if (!recalculateParentHeight || maxHeight === maxHeightRef.current) {
      return;
    }

    recalculateParentHeight(maxHeight - maxHeightRef.current);
    maxHeightRef.current = maxHeight;
  }, [maxHeight, recalculateParentHeight]);

  useEffect(() => {
    setOpen(shouldBeOpen);
    toggle(shouldBeOpen);
  }, [shouldBeOpen, active]);

  useEffect(() => {
    setOpen(isOpenedByDefault);
    toggle(isOpenedByDefault);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    recalculateOwnHeight();
  }, [recalculateOwnHeight]);

  function handleClick(e: MouseEvent) {
    if (!isAccordion) {
      handleItemClick(item)(e);
      return;
    }

    e.preventDefault();
    setOpen(open => !open);
    toggle();
  }

  return (
    <S.Accordion>
      <ListItem
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
              <Accordion
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
