import { memo } from 'react';
import { components as ReactSelectComponents } from 'react-select';

import { SelectProps } from '../../../components';
import { StyledMultiValueContainer } from './styled';

function Stub(): JSX.Element {
  return <></>;
}

export const MultiValueContainer = (props: SelectProps): typeof ReactSelectComponents.MultiValueContainer => {
  const { prefixMultiValueContainer } = props;

  if (!prefixMultiValueContainer) {
    return function (data: React.ComponentProps<typeof ReactSelectComponents.MultiValueContainer>): JSX.Element {
      return <ReactSelectComponents.MultiValueContainer {...data} />;
    };
  }

  const PrefixMultiValueContainerComponent = prefixMultiValueContainer ? memo(prefixMultiValueContainer) : Stub;

  return function ({
    children,
    ...restData
  }: React.ComponentProps<typeof ReactSelectComponents.MultiValueContainer>): JSX.Element {
    return (
      <ReactSelectComponents.MultiValueContainer {...restData}>
        <StyledMultiValueContainer>
          <PrefixMultiValueContainerComponent {...restData} />
          {children}
        </StyledMultiValueContainer>
      </ReactSelectComponents.MultiValueContainer>
    );
  };
};
