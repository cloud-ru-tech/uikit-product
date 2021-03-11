import { Select, ISelectProps } from 'components/Select';
import { PRESET_COLORS, PresetColorType } from 'components/Tag/helpers/colors';
import * as ColorComponents from 'components/Select/helperComponents/ColorPicker';

const colors = PRESET_COLORS.map(color => ({ value: color }));

export type OptionTypeColor = { value: PresetColorType };

export interface IColorPicker extends ISelectProps {
  defaultValue?: OptionTypeColor;
  dropdownPlacement?: 'left' | 'right';
}

export const ColorPicker: React.FC<IColorPicker> = (props): JSX.Element => {
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
