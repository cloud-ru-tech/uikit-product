import cn from 'classnames';
import { MouseEvent, MouseEventHandler, ReactElement, useCallback, useEffect, useRef, useState } from 'react';

import { InfoOutlineSVG } from '@cloud-ru/uikit-product-icons';
import { Sun } from '@snack-uikit/loaders';
import { Typography } from '@snack-uikit/typography';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { CHIP_ANIMATED_TEST_IDS, TOOLTIP_STATE, VARIANT } from './constants';
import styles from './styles.module.scss';
import { ChipAnimatedTooltipProps, TooltipState, Variant } from './types';

export type ChipAnimatedProps = WithSupportProps<{
  label: string;
  icon?: ReactElement;
  tooltip: ChipAnimatedTooltipProps;
  variant?: Variant;
  disabled?: boolean;
  loading?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  tabIndex?: number;
  isTouchDevice?: boolean;
}>;

export function ChipAnimated({
  label,
  icon,
  tooltip,
  variant = VARIANT.Default,
  disabled,
  loading,
  onClick,
  className,
  tabIndex: tabIndexProp,
  isTouchDevice = false,
  ...rest
}: ChipAnimatedProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [tooltipState, setTooltipState] = useState<TooltipState>(TOOLTIP_STATE.Hidden);

  const isTooltipOpen = tooltipState === TOOLTIP_STATE.Opening;
  const isInteractive = !disabled && !loading;
  const tabIndex = isInteractive ? tabIndexProp : -1;

  const handleClick: MouseEventHandler<HTMLButtonElement> = e => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }

    onClick?.(e);
  };

  const handleIconRightMouseEnter = () => {
    if (!isTouchDevice && isInteractive) {
      setTooltipState(TOOLTIP_STATE.Opening);
    }
  };

  const handleIconRightClick = (e: MouseEvent<HTMLSpanElement>) => {
    if (isTouchDevice && isInteractive) {
      e.stopPropagation();
      setTooltipState(tooltipState === TOOLTIP_STATE.Hidden ? TOOLTIP_STATE.Opening : TOOLTIP_STATE.Closing);
    }
  };

  const handleWrapperMouseLeave = () => {
    if (!isTouchDevice && tooltipState === TOOLTIP_STATE.Opening) {
      setTooltipState(TOOLTIP_STATE.Closing);
    }
  };

  const handleTooltipAnimationEnd = useCallback(() => {
    if (tooltipState === TOOLTIP_STATE.Closing) {
      setTooltipState(TOOLTIP_STATE.Hidden);
    }
  }, [tooltipState]);

  useEffect(() => {
    if (!isTouchDevice || tooltipState === TOOLTIP_STATE.Hidden) return;

    const handleClickOutside = (event: Event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setTooltipState(TOOLTIP_STATE.Closing);
      }
    };

    document.addEventListener('pointerdown', handleClickOutside);
    return () => {
      document.removeEventListener('pointerdown', handleClickOutside);
    };
  }, [isTouchDevice, tooltipState]);

  const isTooltipMounted = tooltipState !== TOOLTIP_STATE.Hidden;

  return (
    <div ref={wrapperRef} className={styles.wrapper} onMouseLeave={handleWrapperMouseLeave}>
      {isTooltipMounted && buttonRef.current && (
        <div
          className={styles.tooltipClip}
          data-placement={tooltip.position}
          style={{
            width: buttonRef.current.offsetWidth,
          }}
        >
          <div
            className={styles.tooltip}
            data-variant={variant}
            data-disabled={disabled || undefined}
            data-placement={tooltip.position}
            data-closing={tooltipState === TOOLTIP_STATE.Closing || undefined}
            onAnimationEnd={handleTooltipAnimationEnd}
          >
            {isTouchDevice && <Typography.SansBodyM>{tooltip.label}</Typography.SansBodyM>}
            {!isTouchDevice && <Typography.SansBodyS>{tooltip.label}</Typography.SansBodyS>}
          </div>
        </div>
      )}
      <button
        ref={buttonRef}
        type='button'
        {...extractSupportProps(rest)}
        tabIndex={tabIndex}
        data-variant={variant}
        data-loading={loading || undefined}
        data-disabled={disabled || undefined}
        data-touch={isTouchDevice || undefined}
        aria-disabled={disabled || undefined}
        disabled={!loading && disabled}
        onClick={handleClick}
        className={cn(styles.chipAnimated, className)}
      >
        {loading && (
          <span className={styles.spinner} data-test-id={CHIP_ANIMATED_TEST_IDS.spinner}>
            <Sun size='s' />
          </span>
        )}

        {!loading && icon && (
          <span className={styles.icon} data-test-id={CHIP_ANIMATED_TEST_IDS.icon}>
            {icon}
          </span>
        )}

        {isTouchDevice && (
          <Typography.SansLabelL className={styles.label} data-test-id={CHIP_ANIMATED_TEST_IDS.label}>
            {label}
          </Typography.SansLabelL>
        )}

        {!isTouchDevice && (
          <Typography.SansLabelM className={styles.label} data-test-id={CHIP_ANIMATED_TEST_IDS.label}>
            {label}
          </Typography.SansLabelM>
        )}

        <span
          className={styles.iconRight}
          data-test-id={CHIP_ANIMATED_TEST_IDS.iconRight}
          data-variant={variant}
          data-disabled={disabled || undefined}
          data-tooltip-open={isTooltipOpen || undefined}
          role={isTouchDevice ? 'button' : undefined}
          tabIndex={isTouchDevice && isInteractive ? 0 : undefined}
          onMouseEnter={handleIconRightMouseEnter}
          onClick={handleIconRightClick}
        >
          <InfoOutlineSVG size={24} />
        </span>
      </button>
    </div>
  );
}
