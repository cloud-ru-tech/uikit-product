import { css } from '@linaria/core';
import { useMemo } from 'react';
import { components as ReactSelectComponents, SelectComponentsConfig } from 'react-select';

import { CloseInterfaceSVG, DropdownDownInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { useLanguage } from '@sbercloud/uikit-utils';

import { ISelectProps } from '../components';
import { CustomControl, CustomMenu, MultiValueContainer } from '../helperComponents/Shared';
import { CustomGroup } from '../helperComponents/Shared/CustomGroup';
import { CustomGroupHeading } from '../helperComponents/Shared/CustomGroupHeading';
import { CustomIndicator } from '../helperComponents/Shared/CustomIndicator';
import { CustomOption } from '../helperComponents/Shared/CustomOption';
import { Texts, textProvider } from './texts-provider';

const crossSVGClassName = css`
  fill: currentColor;
`;

export const DropdownIndicator = (
  props: React.ComponentProps<typeof ReactSelectComponents.DropdownIndicator>,
): JSX.Element => (
  <ReactSelectComponents.DropdownIndicator {...props}>
    <DropdownDownInterfaceSVG />
  </ReactSelectComponents.DropdownIndicator>
);

const MultiValueRemove = (props: React.ComponentProps<typeof ReactSelectComponents.MultiValueRemove>): JSX.Element => (
  <ReactSelectComponents.MultiValueRemove {...props}>
    <CloseInterfaceSVG className={crossSVGClassName} />
  </ReactSelectComponents.MultiValueRemove>
);

const NoOptionsMessage = (props: React.ComponentProps<typeof ReactSelectComponents.NoOptionsMessage>): JSX.Element => {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
  const noDataText = useMemo(() => textProvider<string>(languageCode, Texts.NoData), [languageCode]);
  return <ReactSelectComponents.NoOptionsMessage {...props}>{noDataText}</ReactSelectComponents.NoOptionsMessage>;
};

export default <CustomOptionType,>(
  props: ISelectProps<CustomOptionType>,
  isMobile?: boolean,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  /* @ts-ignore */
): SelectComponentsConfig<CustomOptionType> => {
  const customControl = CustomControl<CustomOptionType>(props);
  const customOption = CustomOption<CustomOptionType>(props);
  const customIndicator = CustomIndicator<CustomOptionType>(props);
  const multiValueContainer = MultiValueContainer<CustomOptionType>(props);
  const group = CustomGroup<CustomOptionType>(props);
  const groupHeading = CustomGroupHeading<CustomOptionType>(props);

  const mobile = {
    MultiValueRemove,
    DropdownIndicator,
    IndicatorSeparator: customIndicator,
    NoOptionsMessage,
    Option: customOption,
    Control: customControl,
    MultiValueContainer: multiValueContainer,
    Group: group,
    GroupHeading: groupHeading,
  };

  return {
    ...mobile,
    ...(!isMobile ? { Menu: CustomMenu } : {}),
  };
};
