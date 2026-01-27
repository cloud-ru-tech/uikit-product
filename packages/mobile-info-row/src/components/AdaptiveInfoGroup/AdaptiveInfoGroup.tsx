import { InfoGroup, InfoGroupProps } from '@cloud-ru/uikit-product-info-row';
import { WithLayoutType } from '@cloud-ru/uikit-product-utils';

import { MobileInfoGroup } from '../MobileInfoGroup';
import { DataType } from '../MobileInfoGroup/types';

export type AdaptiveInfoGroupProps<T extends DataType> = WithLayoutType<InfoGroupProps<T>>;

export function AdaptiveInfoGroup<T extends DataType>({ layoutType, ...props }: AdaptiveInfoGroupProps<T>) {
  return layoutType === 'mobile' ? <MobileInfoGroup<T> {...props} /> : <InfoGroup<T> {...props} />;
}
