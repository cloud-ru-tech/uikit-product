import { Marker } from '@sbercloud/uikit-product-marker';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { ToggleCardBoxControl } from '../../helperComponents';
import { Value } from '../../types';
import { Box, Description, DisplayedValue, Text, Title } from './styled';

export type ToggleCardExtendedProps = WithSupportProps<{
  value: Value;
  title: string;
  displayedValue: string;
  description: string;
  label: string;
  className?: string;
  disabled?: boolean;
}>;

export function ToggleCardExtended({
  value,
  title,
  displayedValue,
  description,
  label,
  className,
  disabled,
  ...rest
}: ToggleCardExtendedProps) {
  return (
    <ToggleCardBoxControl value={value} className={className} disabled={disabled} {...extractSupportProps(rest)}>
      <Box>
        <Text>
          <Title data-test-id='toggle-card-extended-title'>{title}</Title>
          <DisplayedValue data-test-id='toggle-card-extended-displayed-value'>{displayedValue}</DisplayedValue>
          <Description data-test-id='toggle-card-extended-description'>{description}</Description>
        </Text>
        <span>
          <Marker variant={Marker.variants.Green} text={label} data-test-id='toggle-card-extended-label' />
        </span>
      </Box>
    </ToggleCardBoxControl>
  );
}
