import cn from 'classnames';
import { useUncontrolledProp } from 'uncontrollable';

import { QuestionSVG } from '@sbercloud/uikit-product-icons';

import { MobileTooltip, MobileTooltipProps } from '../MobileTooltip';
import { SIZE, SIZES_MAP, TRIGGER, TRIGGER_MAP } from './constants';
import styles from './styles.module.scss';
import { Size, Trigger } from './types';

export type MobileQuestionTooltipProps = Omit<MobileTooltipProps, 'children' | 'triggerClassName' | 'trigger'> & {
  /** Условие отображения подсказки */
  trigger?: Trigger;
  /** Размер */
  size?: Size;
  /** CSS-класс контейнера подсказки */
  tooltipClassname?: string;
  /** data-test-id для триггера */
  triggerDataTestId?: string;

  tabIndex?: number;
};

export function MobileQuestionTooltip({
  size = SIZE.Xs,
  trigger = TRIGGER.Hover,
  tooltipClassname,
  className,
  triggerDataTestId,
  open,
  onOpenChange,
  tabIndex = 0,
  ...rest
}: MobileQuestionTooltipProps) {
  const [isOpen, setIsOpen] = useUncontrolledProp(open, false, onOpenChange);

  return (
    <MobileTooltip
      {...rest}
      className={tooltipClassname}
      open={isOpen}
      onOpenChange={setIsOpen}
      trigger={TRIGGER_MAP[trigger]}
    >
      {({ getReferenceProps, ref }) => (
        <span
          {...getReferenceProps({
            onClick: event => event.stopPropagation(),
          })}
          ref={ref}
          data-size={size}
          data-opened={isOpen}
          data-trigger={trigger}
          className={cn(styles.questionTooltip, className)}
          role='button'
          tabIndex={tabIndex}
        >
          <QuestionSVG size={SIZES_MAP[size]} data-test-id={triggerDataTestId} />
        </span>
      )}
    </MobileTooltip>
  );
}
