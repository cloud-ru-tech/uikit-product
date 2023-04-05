import { COLOR_VALUES, Colors } from '../../constants';
import * as ColorComponents from '../../helperComponents/ColorPicker';
import { Select, SelectProps } from '../Default';

const colors = COLOR_VALUES.map(color => ({ value: color }));

export type OptionTypeColor = { value: Colors };

export type IColorPicker = {
  defaultValue?: OptionTypeColor;
  dropdownPlacement?: 'left' | 'right';
} & SelectProps;

export const ColorPicker = (props: IColorPicker): JSX.Element => {
  const { defaultValue = colors[0], dropdownPlacement = 'left' } = props;

  return (
    <Select
      {...props}
      dropdownPlacement={dropdownPlacement}
      defaultValue={defaultValue}
      options={colors}
      components={ColorComponents}
      type='color'
      isSearchable={false}
    />
  );
};
