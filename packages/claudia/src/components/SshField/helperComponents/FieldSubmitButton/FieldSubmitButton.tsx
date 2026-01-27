import { ArrowUpSVG } from '@cloud-ru/uikit-product-icons';
import { useLocale } from '@cloud-ru/uikit-product-locale';
import { ButtonFilled } from '@snack-uikit/button';
import { Tooltip } from '@snack-uikit/tooltip';

export type FieldSubmitButtonProps = {
  active: boolean;
  handleClick(): void;
  size?: 'xs' | 's';
  className?: string;
  fullWidth?: boolean;
  showTooltip?: boolean;
  disabled?: boolean;
};

export function FieldSubmitButton({
  active,
  handleClick,
  size = 'xs',
  className,
  fullWidth,
  showTooltip = true,
  disabled,
}: FieldSubmitButtonProps) {
  const { t } = useLocale('FieldsPredefined');

  if (active) {
    return (
      <Tooltip tip={t('FieldAi.submit.tooltip')} hoverDelayOpen={600} open={showTooltip ? undefined : false}>
        <ButtonFilled
          fullWidth={fullWidth}
          icon={<ArrowUpSVG />}
          size={size}
          appearance='primary'
          type='submit'
          onClick={handleClick}
          className={className}
          disabled={disabled}
        />
      </Tooltip>
    );
  }

  return <ButtonFilled icon={<ArrowUpSVG />} size={size} disabled className={className} fullWidth={fullWidth} />;
}
