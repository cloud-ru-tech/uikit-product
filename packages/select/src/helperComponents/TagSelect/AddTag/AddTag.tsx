import { useCallback, useMemo, useState } from 'react';
import { components as ReactSelectComponents } from 'react-select';

import { Button } from '@sbercloud/uikit-react-button';
import { Tag } from '@sbercloud/uikit-react-tag';
import { useLanguage } from '@sbercloud/uikit-utils';

import { ColorPicker, OptionTypeColor } from '../../../components';
import { PRESET_COLORS } from '../../../constants';
import getRandomInt from '../../../helpers/getRandomInt';
import { Texts, textProvider } from '../../../helpers/texts-provider';
import { Container, NotValidMessage, StyledButton, StyledTagWrapper, colorPickerClassName } from './styled';

export const AddTag: React.FC<React.ComponentProps<typeof ReactSelectComponents.Menu>> = props => {
  const { options, setValue, selectProps } = props;
  const { inputValue: search, colorDropdownPlacement, onTagChange, onSearch, validator, validateMessage } = selectProps;
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
  const [color, setColor] = useState(PRESET_COLORS[getRandomInt(0, PRESET_COLORS.length - 1)]);

  const hasSearched = useMemo(() => options.some(option => option.label === search), [options, search]);
  const onClick = useCallback((): void => {
    const tag = { value: Math.random(), label: search, color };
    onTagChange([tag, ...options], 0, tag, 'add');
    setValue(tag, 'set-value');
    onSearch('');
  }, [search, color, options, setValue, onSearch, onTagChange]);
  const onChange = useCallback((color: OptionTypeColor): void => {
    setColor(color.value);
  }, []);

  const notValid = useMemo(() => validator && !validator(search), [validator, search]);

  const addText = useMemo(() => textProvider<string>(languageCode, Texts.Add), [languageCode]);

  if (!search || hasSearched) return null;

  return (
    <>
      <Container>
        <StyledButton disabled={notValid} variant={Button.variants.Transparent} onClick={onClick} text={addText} />
        <StyledTagWrapper>
          <Tag color={color}>{search}</Tag>
        </StyledTagWrapper>
        <ColorPicker
          className={colorPickerClassName}
          defaultValue={{ value: color }}
          onChange={onChange}
          menuPosition='fixed'
          dropdownPlacement={colorDropdownPlacement}
        />
      </Container>
      {notValid && <NotValidMessage>{validateMessage}</NotValidMessage>}
    </>
  );
};
