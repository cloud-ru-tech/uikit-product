import { ButtonFunction } from '@snack-uikit/button';
import { PlusSVG } from '@snack-uikit/icons';

import styled from './styles.module.scss';
type SelectFooterProps = {
  onClick: VoidFunction;
  createButtonLabel: string;
};
export function SelectFooter({ onClick, createButtonLabel }: SelectFooterProps) {
  return (
    <div className={styled.footerWrapper}>
      <ButtonFunction
        label={createButtonLabel}
        onClick={onClick}
        icon={<PlusSVG />}
        iconPosition='before'
        data-test-id='select-create__create-button-footer'
      />
    </div>
  );
}
