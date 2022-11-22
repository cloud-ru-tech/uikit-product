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
  onInnerToggle?(childHeight?: number): void;
  accordionLevel: number;
  isMobile?: boolean;
};

export function SidebarAccordion({ item, onInnerToggle, accordionLevel = 0, isMobile }: SidebarAccordionProps) {
  const { handleItemClick, active } = useSidebarContext();
  const isAccordion = isItemAccordion(item, isMobile);

  const shouldBeOpen = useNestedActive(item, isMobile);
  const [isOpen, setOpen] = useState(shouldBeOpen);
  const [maxHeight, setMaxHeight] = useState<number | undefined>(!isOpen ? 0 : undefined);
  const accordionRef = useRef<HTMLDivElement>(null);

  const [state, toggle] = useTransition({
    timeout: TRANSITION_TIMING.accordionFolding,
    initialEntered: isOpen,
  });

  const toggleHeight = useCallback(
    (childHeight = 0) => {
      if (accordionRef.current) {
        const currentItemHeight = accordionRef.current.scrollHeight + childHeight;
        setMaxHeight(isOpen ? currentItemHeight : 0);
      }
    },
    [isOpen],
  );

  useEffect(() => {
    setOpen(shouldBeOpen);
    toggle(shouldBeOpen);
  }, [shouldBeOpen, active]);

  useEffect(() => {
    toggleHeight();
  }, [toggleHeight]);

  useEffect(() => {
    if (!accordionRef.current) return;
    onInnerToggle?.(maxHeight === 0 ? -accordionRef.current.scrollHeight : accordionRef.current.scrollHeight);
  }, [maxHeight, onInnerToggle]);

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
          maxHeight={isOpen ? maxHeight : 0}
          data-mobile={isMobile || undefined}
          data-transition-status={state.status}
        >
          {item.nestedList?.map(nested =>
            nested.items.map(nestedItem => (
              <SidebarAccordion
                key={nestedItem.label}
                onInnerToggle={toggleHeight}
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
