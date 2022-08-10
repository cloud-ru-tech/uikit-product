import { cloneElement, ReactElement } from 'react';

import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { ToggleCardBoxControl, ToggleCardBoxIcon } from '../../helperComponents';
import { Value } from '../../types';
import { Box, Caption, Description, Text, Title } from './styled';

export type ToggleCardDisplayExtraProps = WithSupportProps<{
  value: Value;
  title: string;
  icon: ReactElement<{ size?: string | number }>;
  description: string;
  caption: string;
  className?: string;
  disabled?: boolean;
}>;

export function ToggleCardDisplayExtra({
  value,
  title,
  icon,
  description,
  caption,
  className,
  disabled,
  ...rest
}: ToggleCardDisplayExtraProps) {
  return (
    <ToggleCardBoxControl value={value} className={className} disabled={disabled} {...extractSupportProps(rest)}>
      <Box>
        <ToggleCardBoxIcon data-test-id='toggle-card-display-extra-icon'>
          {cloneElement(icon, { size: 80 })}
        </ToggleCardBoxIcon>
        <Text>
          <Caption data-test-id='toggle-card-display-extra-caption'>{caption}</Caption>
          <Title data-test-id='toggle-card-display-extra-title'>{title}</Title>
          <Description data-test-id='toggle-card-display-extra-description'>{description}</Description>
        </Text>
      </Box>
    </ToggleCardBoxControl>
  );
}
