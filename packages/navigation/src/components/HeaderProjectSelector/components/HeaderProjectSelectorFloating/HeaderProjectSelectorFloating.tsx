import {
  autoUpdate,
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  offset,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
} from '@floating-ui/react-dom-interactions';
import { ReactNode, useContext, useLayoutEffect, useRef, useState } from 'react';

import { FloatingContext } from '../../contexts/FloatingContext';
import { ItemContext } from '../../contexts/ItemContext';
import { NavigationContext } from '../../contexts/NavigationContext';
import { ReferenceContext } from '../../contexts/ReferenceContext';
import { SelectionContext } from '../../contexts/SelectionContext';
import * as S from './styled';

export type HeaderProjectSelectorFloatingProps = {
  children: ReactNode;
  content: ReactNode;
};

export function HeaderProjectSelectorFloating({ children, content }: HeaderProjectSelectorFloatingProps) {
  const listRef = useRef<Array<HTMLElement | null>>([]);
  const initialFocusRef = useRef<HTMLElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isKeyboardNavigation, setIsKeyboardNavigation] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { selectedIndex } = useContext(SelectionContext);
  const { x, y, strategy, context, reference, floating } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    placement: 'bottom-start',
    middleware: [
      offset(4),
      shift(),
      size({
        apply({ elements }) {
          elements.floating.style.width = `${400}px`;
        },
      }),
    ],
  });
  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    useClick(context),
    useRole(context, { role: 'listbox' }),
    useDismiss(context),
    useListNavigation(context, {
      listRef,
      activeIndex,
      selectedIndex,
      onNavigate: setActiveIndex,
      loop: true,
      focusItemOnOpen: false,
      focusItemOnHover: false,
    }),
  ]);

  function setItem(item: HTMLElement | null, index: number | null) {
    if (index !== null) {
      listRef.current[index] = item;
    }
  }

  function handlePointerMove() {
    setIsKeyboardNavigation(false);
  }

  function handleKeyDown() {
    setIsKeyboardNavigation(true);
  }

  useLayoutEffect(() => {
    if (!isOpen || selectedIndex === null) {
      return;
    }

    const handle = requestAnimationFrame(() => {
      listRef.current[selectedIndex]?.scrollIntoView({ block: 'center' });
    });

    return () => {
      cancelAnimationFrame(handle);
    };
  }, [isOpen, selectedIndex]);

  useLayoutEffect(() => {
    if (!isOpen || !isKeyboardNavigation || activeIndex === null) {
      return;
    }

    const handle = requestAnimationFrame(() => {
      listRef.current[activeIndex]?.scrollIntoView({ block: 'nearest' });
    });

    return () => {
      cancelAnimationFrame(handle);
    };
  }, [isOpen, isKeyboardNavigation, activeIndex]);

  return (
    <FloatingContext.Provider value={{ isOpen, setIsOpen, initialFocusRef }}>
      <ReferenceContext.Provider value={{ setElement: reference, getProps: getReferenceProps }}>
        <ItemContext.Provider value={{ getProps: getItemProps, setElement: setItem }}>
          <NavigationContext.Provider value={{ activeIndex, setActiveIndex }}>
            {children}
            {isOpen && (
              <FloatingPortal root={document.body}>
                <FloatingOverlay>
                  <FloatingFocusManager context={context} initialFocus={initialFocusRef}>
                    <S.Wrapper
                      strategy={strategy}
                      x={x ?? 0}
                      y={y ?? 0}
                      ref={floating}
                      data-test-id='header-project-selector__floating'
                      {...getFloatingProps({ onPointerMove: handlePointerMove, onKeyDown: handleKeyDown })}
                    >
                      {content}
                    </S.Wrapper>
                  </FloatingFocusManager>
                </FloatingOverlay>
              </FloatingPortal>
            )}
          </NavigationContext.Provider>
        </ItemContext.Provider>
      </ReferenceContext.Provider>
    </FloatingContext.Provider>
  );
}
