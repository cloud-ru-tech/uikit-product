import { ArrowUpSVG } from '@sbercloud/uikit-product-icons';
import { useLocale } from '@sbercloud/uikit-product-locale';
import { ButtonFilled } from '@snack-uikit/button';
import { Tooltip } from '@snack-uikit/tooltip';

export type FieldSubmitButtonProps = {
  active: boolean;
  handleClick(): void;
  size?: 'xs' | 's';
};

export function FieldSubmitButton({ active, handleClick, size = 'xs' }: FieldSubmitButtonProps) {
  const { t } = useLocale('FieldsPredefined');

  if (active) {
    return (
      <Tooltip tip={t('FieldAi.submit.tooltip')} hoverDelayOpen={600}>
        <ButtonFilled icon={<ArrowUpSVG />} size={size} appearance='primary' type='submit' onClick={handleClick} />
      </Tooltip>
    );
  }

  return <ButtonFilled icon={<ArrowUpSVG />} size={size} disabled />;
}
