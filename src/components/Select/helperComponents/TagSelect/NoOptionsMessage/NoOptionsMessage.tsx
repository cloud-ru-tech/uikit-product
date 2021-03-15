import { useState } from 'react';
import { css } from '@linaria/core';
import { components as ReactSelectComponents } from 'react-select';

import { Tag } from 'components/Tag';
import { ColorPicker, OptionTypeColor } from 'components/Select';
import getRandomInt from 'components/Select/helpers/getRandomInt';
import { PRESET_COLORS } from 'components/Tag/helpers/colors';

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
  const [color, setColor] = useState(
    PRESET_COLORS[getRandomInt(0, PRESET_COLORS.length - 1)],
  );

  return (
    <ReactSelectComponents.NoOptionsMessage {...props}>
      <StyledButton
        type='transparent'
        size='xs'
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
        // TODO: check type error
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
