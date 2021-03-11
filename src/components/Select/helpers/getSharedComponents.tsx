import {
  SelectComponentsConfig,
  components as ReactSelectComponents,
} from 'react-select';
import { css } from '@linaria/core';

import { ArrowDownSVG, CrossSVG } from '@aicloud/ui-icons';

import { ISelectProps } from 'components/Select';

import { CustomOption } from '../helperComponents/Shared/CustomOption';
import { CustomControl } from '../helperComponents/Shared/CustomControl';
import { CustomMenu } from '../helperComponents/Shared/CustomMenu';
import { MultiValueContainer } from '../helperComponents/Shared/MultiValueContainer';

const crossSVGClassName = css`
  fill: inherit;
`;

export const DropdownIndicator = (
  props: React.ComponentProps<typeof ReactSelectComponents.DropdownIndicator>,
): JSX.Element => (
  <ReactSelectComponents.DropdownIndicator {...props}>
    <ArrowDownSVG />
  </ReactSelectComponents.DropdownIndicator>
);

const MultiValueRemove = (
  props: React.ComponentProps<typeof ReactSelectComponents.MultiValueRemove>,
): JSX.Element => (
  <ReactSelectComponents.MultiValueRemove {...props}>
    <CrossSVG className={crossSVGClassName} />
  </ReactSelectComponents.MultiValueRemove>
);

const NoOptionsMessage = (
  props: React.ComponentProps<typeof ReactSelectComponents.NoOptionsMessage>,
): JSX.Element => (
  <ReactSelectComponents.NoOptionsMessage {...props}>
    Нет данных
  </ReactSelectComponents.NoOptionsMessage>
);

const IndicatorSeparator = () => null;

export default <CustomOptionType, IsMulti extends boolean = false>(
  props: ISelectProps<CustomOptionType>,
): SelectComponentsConfig<CustomOptionType, IsMulti> => {
  const customControl = CustomControl<CustomOptionType>(props);
  const customOption = CustomOption<CustomOptionType>(props);
  const multiValueContainer = MultiValueContainer<CustomOptionType>(props);

  return {
    MultiValueRemove,
    DropdownIndicator,
    IndicatorSeparator,
    NoOptionsMessage,
    Option: customOption,
    Control: customControl,
    MultiValueContainer: multiValueContainer,
    Menu: CustomMenu,
  };
};
