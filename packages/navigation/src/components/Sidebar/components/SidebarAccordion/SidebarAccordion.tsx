import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react';

import { TRANSITION_TIMING } from '../../constants';
import { useSidebarContext } from '../../context';
import { isItemAccordion } from '../../helpers';
import { useNestedActive } from '../../hooks';
import { SidebarItemProps } from '../../types';
import { SidebarItem } from '../SidebarItem';
import * as S from './styled';

type SidebarAccordionProps = {
  item: SidebarItemProps;
  onInnerToggle?(isInner?: boolean): void;
  accordionLevel: number;
};

export function SidebarAccordion({ item, onInnerToggle, accordionLevel = 0 }: SidebarAccordionProps) {
  const { handleItemClick, isSearchShown, active } = useSidebarContext();
  const isAccordion = isItemAccordion(item);
  const nestedActive = useNestedActive(item);

  const shouldBeOpen = nestedActive && !isSearchShown;
  const [isOpen, setOpen] = useState(shouldBeOpen);
  const [maxHeight, setMaxHeight] = useState<number | undefined>(!isOpen ? 0 : undefined);
  const accordionRef = useRef<HTMLDivElement>(null);

  const toggleHeight = useCallback(
    (isInner?: boolean) => {
      if (accordionRef.current) {
        const scrollHeight = accordionRef.current.scrollHeight;
        const newHeight = isInner ? scrollHeight * 2 : scrollHeight;

        setMaxHeight(isOpen ? newHeight : 0);
      }
    },
    [isOpen],
  );

  useEffect(() => {
    setOpen(shouldBeOpen);
  }, [active, shouldBeOpen]);

  useEffect(() => {
    toggleHeight();

    setTimeout(() => {
      onInnerToggle?.(true);
    }, TRANSITION_TIMING.common); // delay for css-transition
  }, [isOpen, onInnerToggle, toggleHeight]);

  function handleClick(e: MouseEvent) {
    if (isAccordion) {
      e.preventDefault();

      setOpen(open => !open);
      return;
    }

    handleItemClick(item)(e);
  }

  return (
    <S.Accordion>
      <SidebarItem {...item} showArrow={isAccordion} onClick={handleClick} level={accordionLevel} isOpen={isOpen} />

      {item.nestedList?.length && (
        <S.AccordionFoldable ref={accordionRef} maxHeight={isOpen ? maxHeight : 0}>
          {item.nestedList?.map(nested =>
            nested.items.map(nestedItem => (
              <SidebarAccordion
                key={nestedItem.label}
                onInnerToggle={toggleHeight}
                item={nestedItem}
                accordionLevel={accordionLevel + 1}
              />
            )),
          )}
        </S.AccordionFoldable>
      )}
    </S.Accordion>
  );
}
