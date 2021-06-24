import { Button } from '@sbercloud/uikit-react-button';
import { Tag } from '@sbercloud/uikit-react-tag';
import { useMemo, useState } from 'react';
import { components as ReactSelectComponents } from 'react-select';

import { ColorPicker, OptionTypeColor } from '../../../components';
import { PRESET_COLORS } from '../../../constants';
import getRandomInt from '../../../helpers/getRandomInt';
import { Container, StyledButton, StyledTagWrapper, colorPickerClassName } from './styled';

export const AddTag: React.FC<React.ComponentProps<typeof ReactSelectComponents.Menu>> = props => {
  const { options, setValue, selectProps } = props;
  const { inputValue: search, colorDropdownPlacement, onTagChange, onSearch } = selectProps;
  const [color, setColor] = useState(PRESET_COLORS[getRandomInt(0, PRESET_COLORS.length - 1)]);

  const hasSearched = useMemo(() => options.some(option => option.label === search), [options, search]);

  if (!search || hasSearched) return null;

  return (
    <Container>
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
    </Container>
  );
};
