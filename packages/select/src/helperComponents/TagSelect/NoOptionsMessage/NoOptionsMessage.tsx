import { css } from '@linaria/core';
import { useState } from 'react';
import { components as ReactSelectComponents } from 'react-select';

import { Button } from '@sbercloud/uikit-react-button';
import { Tag } from '@sbercloud/uikit-react-tag';

import { ColorPicker, OptionTypeColor } from '../../../components';
import { PRESET_COLORS } from '../../../constants';
import getRandomInt from '../../../helpers/getRandomInt';
import { StyledButton, StyledTagWrapper } from './styled';

const colorPickerClassName = css`
  width: 20px;
`;

export const NoOptionsMessage = (
  props: React.ComponentProps<typeof ReactSelectComponents.NoOptionsMessage>,
): JSX.Element => {
  const {
    selectProps: { onTagChange, onSearch },
    options,
    setValue,
    selectProps: { inputValue: search, colorDropdownPlacement },
  } = props;
  const [color, setColor] = useState(PRESET_COLORS[getRandomInt(0, PRESET_COLORS.length - 1)]);

  return (
    <ReactSelectComponents.NoOptionsMessage {...props}>
      <StyledButton
        variant={Button.variants.Transparent}
        size={Button.sizes.xs}
        onClick={(): void => {
          const tag = { value: Math.random(), label: search, color };
          onTagChange([tag, ...options], 0, tag, 'add');
          setValue(tag, 'set-value');
          onSearch('');
        }}
      >
        Добавить
      </StyledButton>
      <StyledTagWrapper>
        <Tag color={color}>{search}</Tag>
      </StyledTagWrapper>
      <ColorPicker
        className={colorPickerClassName}
        defaultValue={{ value: color }}
        onChange={(color: OptionTypeColor): void => {
          setColor(color.value);
        }}
        menuPosition='fixed'
        dropdownPlacement={colorDropdownPlacement}
      />
    </ReactSelectComponents.NoOptionsMessage>
  );
};
