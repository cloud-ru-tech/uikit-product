import { COLOR_VALUES, Colors } from '../../constants';
import * as ColorComponents from '../../helperComponents/ColorPicker';
import { ISelectProps, OptionTypeBase, Select } from '../Default';

const colors = COLOR_VALUES.map(color => ({ value: color }));

export type OptionTypeColor = { value: Colors };

export interface IColorPicker<OptionTypeColor> extends ISelectProps<OptionTypeColor> {
  defaultValue?: OptionTypeColor;
  dropdownPlacement?: 'left' | 'right';
}

export const ColorPicker = <OptionTypeColor extends OptionTypeBase>(
  props: IColorPicker<OptionTypeColor>,
): JSX.Element => {
  const { defaultValue = colors[0], dropdownPlacement = 'left' } = props;

  return (
    <Select<OptionTypeColor>
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
