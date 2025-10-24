import { ReactNode, useEffect, useRef, useState } from 'react';

import { LAYOUT_TYPE, LayoutType } from '@sbercloud/uikit-product-utils';

import { Chip } from './helperComponents/Chip';
import { ClaudiaChip } from './helperComponents/ClaudiaChip';
import { CloseChip } from './helperComponents/CloseChip';
import { DropdownChip } from './helperComponents/DropdownChip';
import styles from './styles.module.scss';
import { CHIP_TYPE, ChipProps, ChipType, SIZE, Size } from './types';
import { getVisibleChipsCount } from './utils/gitVisibleChipsCount';

export type RecommendPanelProps = {
  chips: ChipProps[];
  size: Size;
  type?: ChipType;
  layoutType?: LayoutType;
  onCloseClick?: () => void;
  onCloseChipLabel?: ReactNode;
  tooltip?: ReactNode;
  onClaudiaClick?: () => void;
};

export function RecommendPanel({
  chips,
  type = CHIP_TYPE.Default,
  size = SIZE.S,
  layoutType,
  onCloseClick,
  onCloseChipLabel,
  tooltip,
  onClaudiaClick,
}: RecommendPanelProps) {
  const [containerWidth, setContainerWidth] = useState(0);
  const [isCloseIconVisible, setCloseIconVisible] = useState(false);
  const [chipWidths, setChipWidths] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const allChipsRefs = useRef<(HTMLButtonElement | HTMLElement | null)[]>([]);
  const isSmall = size === SIZE.S;

  useEffect(() => {
    if (layoutType === LAYOUT_TYPE.Mobile) {
      setCloseIconVisible(true);
      return;
    }

    setCloseIconVisible(false);
  }, [layoutType]);

  useEffect(() => {
    const widths = allChipsRefs.current.map(ref => {
      if (!ref) return 0;
      const rect = ref.getBoundingClientRect();

      return rect.width;
    });

    setChipWidths(widths);
  }, [chips, allChipsRefs]);

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const visibleChipsCount = getVisibleChipsCount({
    containerWidth,
    chips,
    chipWidths,
    isSmall,
    isCloseChipExist: Boolean(onCloseClick) && Boolean(onCloseChipLabel),
  });
  const visibleChips = chips.slice(0, visibleChipsCount);
  const hiddenChips = chips.slice(visibleChipsCount);
  const hasHiddenChips = hiddenChips.length > 0;

  const showCloseIcon = () => {
    if (layoutType === LAYOUT_TYPE.Mobile) return;
    setCloseIconVisible(true);
  };
  const hideCloseIcon = () => {
    if (layoutType === LAYOUT_TYPE.Mobile) return;
    setCloseIconVisible(false);
  };

  return (
    <div className={styles.container} ref={containerRef} onMouseEnter={showCloseIcon} onMouseLeave={hideCloseIcon}>
      <ClaudiaChip layoutType={layoutType} onClick={onClaudiaClick} size={size} tooltip={tooltip} />
      {visibleChips.map((chip, index) => (
        <Chip
          ref={chipElement => (allChipsRefs.current[index] = chipElement)}
          key={chip.id}
          label={chip.label}
          size={size}
          type={type}
          layoutType={layoutType}
          onClick={chip.onClick}
        />
      ))}
      {hasHiddenChips && (
        <DropdownChip
          layoutType={layoutType}
          type={type}
          size={size}
          label={`+${hiddenChips.length}`}
          dropdownItems={hiddenChips}
        />
      )}
      {onCloseClick && onCloseChipLabel && (
        <CloseChip
          size={size}
          layoutType={layoutType}
          content={onCloseChipLabel}
          onClick={onCloseClick}
          isVisible={isCloseIconVisible}
        />
      )}
    </div>
  );
}
