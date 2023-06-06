import { css } from '@linaria/core';
import { useMemo } from 'react';
import { components as ReactSelectComponents, SelectComponentsConfig } from 'react-select';

import { CloseInterfaceSVG, DropdownDownInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { useLanguage } from '@sbercloud/uikit-product-utils';

import { SelectProps } from '../components';
import { CustomControl, CustomMenu, MultiValueContainer } from '../helperComponents/Shared';
import { CustomGroup } from '../helperComponents/Shared/CustomGroup';
import { CustomGroupHeading } from '../helperComponents/Shared/CustomGroupHeading';
import { CustomIndicator } from '../helperComponents/Shared/CustomIndicator';
import { CustomOption } from '../helperComponents/Shared/CustomOption';
import { textProvider, Texts } from './texts-provider';

const crossSVGClassName = css`
  fill: currentColor;
`;

export function DropdownIndicator(
  props: React.ComponentProps<typeof ReactSelectComponents.DropdownIndicator>,
): JSX.Element {
  return (
    <ReactSelectComponents.DropdownIndicator {...props}>
      <DropdownDownInterfaceSVG />
    </ReactSelectComponents.DropdownIndicator>
  );
}

function MultiValueRemove(props: React.ComponentProps<typeof ReactSelectComponents.MultiValueRemove>): JSX.Element {
  return (
    <ReactSelectComponents.MultiValueRemove {...props}>
      <CloseInterfaceSVG className={crossSVGClassName} />
    </ReactSelectComponents.MultiValueRemove>
  );
}

function NoOptionsMessage(props: React.ComponentProps<typeof ReactSelectComponents.NoOptionsMessage>): JSX.Element {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
  const noDataText = useMemo(() => textProvider<string>(languageCode, Texts.NoData), [languageCode]);
  return <ReactSelectComponents.NoOptionsMessage {...props}>{noDataText}</ReactSelectComponents.NoOptionsMessage>;
}

export const getSharedComponents = (
  props: SelectProps,
  isMobile?: boolean,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  /* @ts-ignore */
): SelectComponentsConfig<typeof ReactSelectComponents> => {
  const customControl = CustomControl(props);
  const customOption = CustomOption(props);
  const customIndicator = CustomIndicator(props);
  const multiValueContainer = MultiValueContainer(props);
  const group = CustomGroup(props);
  const groupHeading = CustomGroupHeading(props);

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
