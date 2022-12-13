import { forwardRef, LiHTMLAttributes } from 'react';

import { Box, BoxProps } from '../Box';
import { ListItem } from '../ListItem';

export type BoxListItemProps = LiHTMLAttributes<HTMLElement> & BoxProps;

export const BoxListItem = forwardRef<HTMLElement, BoxListItemProps>(function BoxListItem(props, ref) {
  return <Box {...props} as={ListItem} ref={ref} />;
});
