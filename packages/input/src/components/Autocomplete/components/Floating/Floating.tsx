import {
  autoUpdate,
  flip,
  offset,
  shift,
  size,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import { ReactNode, useEffect, useRef, useState } from 'react';

import { AutocompleteProps } from '../../Autocomplete';
import { FloatingContext, ReferenceContext } from '../../contexts';
import { DropList } from '../DropList';
import { ADDITIONAL_BUTTON_SIZE, INFO_BOX_SIZE } from '../DropList/constants';
import { DROPLIST_MAX_HEIGHT } from './constants';
import * as S from './styled';

export type FloatingProps = {
  children: ReactNode;
} & Pick<
  AutocompleteProps,
  'value' | 'onSelect' | 'disabled' | 'isOptionsError' | 'loading' | 'isOptionsError' | 'options' | 'additionalButton'
>;

export function Floating({
  children,
  onSelect,
  loading,
  isOptionsError,
  options,
  disabled,
  value,
  additionalButton,
}: FloatingProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropListHeigth, setDropListHeight] = useState(0);

  const droplistRef = useRef<HTMLDivElement | null>(null);

  const { x, y, strategy, context, refs } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    placement: 'bottom-start',
    middleware: [
      offset(4),
      shift({
        boundary: document.body,
      }),
      flip(),
      size({
        apply({ elements, rects }) {
          elements.floating.style.width = `${rects.reference.width}px`;
        },
      }),
    ],
  });

  const { getReferenceProps } = useInteractions([useRole(context, { role: 'listbox' }), useDismiss(context)]);

  const infoBoxSize = additionalButton ? INFO_BOX_SIZE + ADDITIONAL_BUTTON_SIZE : INFO_BOX_SIZE;

  useEffect(() => {
    if (!droplistRef.current) return;
    const resizeObserver = new ResizeObserver(() => {
      setDropListHeight(droplistRef.current?.clientHeight || 0);
    });
    resizeObserver.observe(droplistRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const droplistMaxHeight =
    loading || isOptionsError || !options.length
      ? infoBoxSize
      : Math.min(dropListHeigth || DROPLIST_MAX_HEIGHT, DROPLIST_MAX_HEIGHT);

  useEffect(() => {
    if (isOpen && disabled) {
      setIsOpen(false);
    }
  }, [isOpen, disabled]);

  return (
    <FloatingContext.Provider value={{ isOpen, setIsOpen }}>
      <ReferenceContext.Provider value={{ setElement: refs.setReference, getProps: getReferenceProps }}>
        {children}

        {isOpen && (
          <S.Wrapper
            maxHeight={droplistMaxHeight}
            strategy={strategy}
            x={x ?? 0}
            y={y ?? 0}
            ref={refs.setFloating}
            data-test-id='droplist__floating'
          >
            <DropList
              loading={loading}
              isOptionsError={isOptionsError}
              options={options}
              handleItemSelect={onSelect}
              droplistRef={droplistRef}
              value={value}
              additionalButton={additionalButton}
            />
          </S.Wrapper>
        )}
      </ReferenceContext.Provider>
    </FloatingContext.Provider>
  );
}
