import {
  arrow,
  FloatingPortal,
  offset,
  safePolygon,
  shift,
  useDismiss,
  useFloating,
  useHover,
  useInteractions,
} from '@floating-ui/react-dom-interactions';
import { ReactNode, useRef, useState } from 'react';

import { useSidebarContext } from '../../context';
import { Mode, SidebarItemProps } from '../../types';
import { HoverMenuItem } from './components';
import * as S from './styled';

export type HoverMenuProps = {
  children: ReactNode;
  item: SidebarItemProps;
};

export function HoverMenu({ children, item }: HoverMenuProps) {
  const { handleItemClick } = useSidebarContext();
  const arrowRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);
  const shouldCloseOnReferenceClick = item.mode !== Mode.Accordion && Boolean(item.nestedList?.length);
  const {
    x,
    y,
    strategy,
    context,
    reference,
    floating,
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
  } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'right-start',
    middleware: [offset({ mainAxis: 12, alignmentAxis: -8 }), shift(), arrow({ element: arrowRef })],
  });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, { restMs: 100, handleClose: safePolygon({ buffer: 1 }) }),
    useDismiss(context, { referencePointerDown: shouldCloseOnReferenceClick }),
  ]);

  return (
    <>
      <S.TriggerWrapper ref={reference} {...getReferenceProps()}>
        {children}
      </S.TriggerWrapper>
      {isOpen && (
        <FloatingPortal root={document.body}>
          <S.ContentWrapper strategy={strategy} x={x ?? 0} y={y ?? 0} ref={floating} {...getFloatingProps()}>
            <S.Arrow ref={arrowRef} strategy={strategy} x={arrowX ?? 0} y={arrowY ?? 0} />
            <S.MenuContent data-test-id='sidebar__hover-menu'>
              <HoverMenuItem {...item} level={0} onClick={handleItemClick(item)} closeMenu={closeMenu} />
            </S.MenuContent>
          </S.ContentWrapper>
        </FloatingPortal>
      )}
    </>
  );
}

HoverMenu.itemMode = Mode;
