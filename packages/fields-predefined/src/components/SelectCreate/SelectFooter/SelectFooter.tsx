import { PlusSVG } from '@sbercloud/uikit-product-icons';
import { useLocale } from '@sbercloud/uikit-product-locale';
import { ButtonFunction } from '@snack-uikit/button';
import { WithTooltip } from '@snack-uikit/tooltip';

import styled from './styles.module.scss';
type SelectFooterProps = {
  onClick: VoidFunction;
  createButtonLabel: string;
  canCreate: boolean;
};
export function SelectFooter({ onClick, createButtonLabel, canCreate }: SelectFooterProps) {
  const { t } = useLocale('FieldsPredefined');

  return (
    <div className={styled.footerWrapper}>
      <WithTooltip tooltip={canCreate ? undefined : { tip: t('SelectCreate.noPermission'), placement: 'top' }}>
        <ButtonFunction
          label={createButtonLabel}
          onClick={onClick}
          icon={<PlusSVG />}
          iconPosition='before'
          data-test-id='select-create__create-button-footer'
          disabled={!canCreate}
        />
      </WithTooltip>
    </div>
  );
}
