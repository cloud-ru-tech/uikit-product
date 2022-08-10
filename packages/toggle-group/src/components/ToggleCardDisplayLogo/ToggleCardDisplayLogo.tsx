import { cloneElement, ReactElement } from 'react';

import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { ToggleCardBoxControl, ToggleCardBoxIcon } from '../../helperComponents';
import { Value } from '../../types';
import { Box, Caption, Text, Title } from './styled';

export type ToggleCardDisplayLogoProps = WithSupportProps<{
  value: Value;
  title: string;
  icon: ReactElement<{ size?: string | number }>;
  caption: string;
  className?: string;
  disabled?: boolean;
}>;

export function ToggleCardDisplayLogo({
  value,
  title,
  icon,
  caption,
  className,
  disabled,
  ...rest
}: ToggleCardDisplayLogoProps) {
  return (
    <ToggleCardBoxControl value={value} className={className} disabled={disabled} {...extractSupportProps(rest)}>
      <Box>
        <ToggleCardBoxIcon data-test-id='toggle-card-display-logo-icon'>
          {cloneElement(icon, { size: 32 })}
        </ToggleCardBoxIcon>
        <Text>
          <Title data-test-id='toggle-card-display-logo-title'>{title}</Title>
          <Caption data-test-id='toggle-card-display-logo-caption'>{caption}</Caption>
        </Text>
      </Box>
    </ToggleCardBoxControl>
  );
}
