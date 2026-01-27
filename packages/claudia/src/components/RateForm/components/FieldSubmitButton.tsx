import { ArrowUpSVG } from '@cloud-ru/uikit-product-icons';
import { ButtonTonal } from '@snack-uikit/button';
import { Tooltip } from '@snack-uikit/tooltip';

export type FieldSubmitButtonProps = {
  /** Активна ли кнопка */
  active: boolean;
  /** Callback при клике */
  onClick: () => void;
  /** Размер кнопки */
  size?: 'xs' | 's';
  /** Дополнительный className */
  className?: string;
  /** Кнопка на всю ширину */
  fullWidth?: boolean;
  /** Текст тултипа */
  tooltipText?: string;
};

export function FieldSubmitButton({
  active,
  onClick,
  size = 'xs',
  className,
  fullWidth,
  tooltipText,
}: FieldSubmitButtonProps) {
  if (active) {
    return (
      <Tooltip tip={tooltipText} hoverDelayOpen={600} open={tooltipText ? undefined : false}>
        <ButtonTonal
          fullWidth={fullWidth}
          icon={<ArrowUpSVG />}
          size={size}
          appearance='primary'
          type='button'
          onClick={onClick}
          className={className}
        />
      </Tooltip>
    );
  }

  return <ButtonTonal icon={<ArrowUpSVG />} size={size} disabled className={className} fullWidth={fullWidth} />;
}
