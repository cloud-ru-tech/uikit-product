import { useMemo } from 'react';

import { QuestionInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { Tooltip } from '@sbercloud/uikit-react-tooltip';
import { extractSupportProps } from '@sbercloud/uikit-utils';

import { Switch } from '../Switch';
import * as S from './styled';
import { SwitchRowProps } from './types';

export type { SwitchRowProps };

function StylelessSwitchRow({
  title,
  description,
  checked,
  disabled,
  onChange,
  tooltip,
  className,
  ...rest
}: SwitchRowProps) {
  const titleContent = useMemo(() => {
    if (Boolean(tooltip?.title || tooltip?.content)) {
      return (
        <>
          {title}

          <Tooltip
            data-test-id='switch-row__tooltip'
            title={tooltip?.title}
            content={tooltip?.content}
            classNameTrigger={S.titleTooltipClassName}
          >
            <QuestionInterfaceSVG />
          </Tooltip>
        </>
      );
    }

    return title;
  }, [title, tooltip]);

  return (
    <div
      className={className}
      data-disabled={disabled || undefined}
      data-checked={checked || undefined}
      {...extractSupportProps(rest)}
    >
      <S.Content>
        <S.Title data-test-id='switch-row__title'>{titleContent}</S.Title>
        {description && <S.Description data-test-id='switch-row__description'>{description}</S.Description>}
      </S.Content>

      <S.SwitchLabel data-disabled={disabled || undefined}>
        <Switch
          data-test-id='switch-row__switch'
          size={Switch.sizes.Big}
          checked={checked}
          disabled={disabled}
          onChange={onChange}
        />
      </S.SwitchLabel>
    </div>
  );
}

const StyledSwitchRow = S.styledSwitchRow(StylelessSwitchRow);

export const SwitchRow = StyledSwitchRow as typeof StyledSwitchRow;
