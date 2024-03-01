import { ButtonFunction } from '@snack-uikit/button';
import { PlusSVG } from '@snack-uikit/icons';
import { Tooltip } from '@snack-uikit/tooltip';

import type { GroupSectionProps } from '../GroupSection';

type GroupSectionFooterButtonProps = NonNullable<GroupSectionProps['addItem']>;

export function GroupSectionFooterButton({ handler, label, tooltip, disabled }: GroupSectionFooterButtonProps) {
  const button = (
    <ButtonFunction
      size='m'
      disabled={disabled}
      onClick={handler}
      icon={<PlusSVG />}
      iconPosition='before'
      label={label}
      data-test-id='header__select-group-section-add-button'
    />
  );

  if (tooltip) {
    return <Tooltip tip={tooltip}>{button}</Tooltip>;
  }

  return button;
}
