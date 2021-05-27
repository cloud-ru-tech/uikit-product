import { memo } from 'react';
import { components as ReactSelectComponents } from 'react-select';

import { ISelectProps } from '../../../components';
import { StyledMultiValueContainer } from './styled';

const Stub = (): JSX.Element => <></>;

export const MultiValueContainer = <CustomOptionType,>(
  props: ISelectProps<CustomOptionType>,
): typeof ReactSelectComponents.MultiValueContainer => {
  const { prefixMultiValueContainer } = props;

  if (!prefixMultiValueContainer) {
    return (data: React.ComponentProps<typeof ReactSelectComponents.MultiValueContainer>): JSX.Element => (
      <ReactSelectComponents.MultiValueContainer {...data} />
    );
  }

  const PrefixMultiValueContainerComponent = prefixMultiValueContainer ? memo(prefixMultiValueContainer) : Stub;

  return ({
    children,
    ...restData
  }: React.ComponentProps<typeof ReactSelectComponents.MultiValueContainer>): JSX.Element => (
    <ReactSelectComponents.MultiValueContainer {...restData}>
      <StyledMultiValueContainer>
        <PrefixMultiValueContainerComponent {...restData} />
        {children}
      </StyledMultiValueContainer>
    </ReactSelectComponents.MultiValueContainer>
  );
};
