import { css } from '@linaria/core';
import { ArrowDownSVG, CrossSVG } from '@sbercloud/icons';
import { useLanguage } from '@sbercloud/uikit-react-localization';
import { useMemo } from 'react';
import { components as ReactSelectComponents, SelectComponentsConfig } from 'react-select';

import { ISelectProps } from '../components';
import { CustomControl, CustomMenu, MultiValueContainer } from '../helperComponents/Shared';
import { CustomGroup } from '../helperComponents/Shared/CustomGroup';
import { CustomGroupHeading } from '../helperComponents/Shared/CustomGroupHeading';
import { CustomOption } from '../helperComponents/Shared/CustomOption';
import { Texts, textProvider } from './texts-provider';

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

const MultiValueRemove = (props: React.ComponentProps<typeof ReactSelectComponents.MultiValueRemove>): JSX.Element => (
  <ReactSelectComponents.MultiValueRemove {...props}>
    <CrossSVG className={crossSVGClassName} />
  </ReactSelectComponents.MultiValueRemove>
);

const NoOptionsMessage = (props: React.ComponentProps<typeof ReactSelectComponents.NoOptionsMessage>): JSX.Element => {
  const language = useLanguage({ onlyEnabledLanguage: true });
  const noDataText = useMemo(() => textProvider<string>(language, Texts.noData), [language]);
  return <ReactSelectComponents.NoOptionsMessage {...props}>{noDataText}</ReactSelectComponents.NoOptionsMessage>;
};

const IndicatorSeparator = () => null;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
/* @ts-ignore */
export default <CustomOptionType,>(props: ISelectProps<CustomOptionType>): SelectComponentsConfig<CustomOptionType> => {
  const customControl = CustomControl<CustomOptionType>(props);
  const customOption = CustomOption<CustomOptionType>(props);
  const multiValueContainer = MultiValueContainer<CustomOptionType>(props);
  const group = CustomGroup<CustomOptionType>(props);
  const groupHeading = CustomGroupHeading<CustomOptionType>(props);

  return {
    MultiValueRemove,
    DropdownIndicator,
    IndicatorSeparator,
    NoOptionsMessage,
    Option: customOption,
    Control: customControl,
    MultiValueContainer: multiValueContainer,
    Menu: CustomMenu,
    Group: group,
    GroupHeading: groupHeading,
  };
};
