import {
  components as ReactSelectComponents,
  MenuListComponentProps,
  NamedProps as ReactSelectNamedProps,
} from 'react-select';

import { CheckboxIconPrivate } from '@sbercloud/uikit-product-checkbox';
import { useLanguage } from '@sbercloud/uikit-product-utils';

import { SelectActionTypes } from '../../../constants';
import { textProvider, Texts } from '../../../helpers/texts-provider';
import { MultiSelectModeType, MultiSelectOptionType } from '../../../helpers/types';
import { CustomOptionWithCheckbox, Label } from '../Option/styled';

export function MenuList(props: MenuListComponentProps<MultiSelectOptionType, true>): JSX.Element {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  const {
    children,
    getValue,
    options,
    selectProps: { inputValue = '', mode, onChange },
  } = props;

  const isAllSelected = getValue().length === options.length;
  const isInMenuSearch = mode.type === MultiSelectModeType.InMenuSearch;

  const handleChange = onChange as NonNullable<ReactSelectNamedProps<MultiSelectOptionType, true>['onChange']>;

  const handleSelect = () => {
    if (isAllSelected) {
      handleChange(options, {
        action: SelectActionTypes.Reset,
      });
    } else {
      handleChange(options, {
        action: SelectActionTypes.SelectOption,
      });
    }
  };

  return (
    <ReactSelectComponents.MenuList {...props}>
      {isInMenuSearch && options.length > 0 && inputValue.length === 0 && (
        <CustomOptionWithCheckbox onClick={handleSelect}>
          <CheckboxIconPrivate partChecked={isAllSelected} />
          <Label>
            {isAllSelected
              ? textProvider<string>(languageCode, Texts.Reset)
              : textProvider<string>(languageCode, Texts.SelectAll)}
          </Label>
        </CustomOptionWithCheckbox>
      )}

      {children}
    </ReactSelectComponents.MenuList>
  );
}
