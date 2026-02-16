import { useLocale } from '@cloud-ru/uikit-product-locale';
import { Tooltip } from '@snack-uikit/tooltip';

import { ButtonVmAgent } from '../ButtonVmAgent';

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
  showTooltip = true,
  disabled,
}: FieldSubmitButtonProps) {
  const { t } = useLocale('FieldsPredefined');

  if (active) {
    return (
      <Tooltip tip={t('FieldAi.submit.tooltip')} hoverDelayOpen={600} open={showTooltip ? undefined : false}>
        <ButtonVmAgent size={size} handleClick={handleClick} disabled={disabled} />
      </Tooltip>
    );
  }

  return <ButtonVmAgent size={size} handleClick={handleClick} disabled={disabled} />;
}
