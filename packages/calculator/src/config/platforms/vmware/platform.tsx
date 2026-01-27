import { VmwareSVG } from '@cloud-ru/uikit-product-icons';

import { PLATFORM } from '../../../constants';
import { Platform } from '../../../types';

export const VM_WARE_PLATFORM: Platform = {
  id: PLATFORM.VmWare,
  icon: <VmwareSVG />,
  label: 'Облако VMware',
  description: 'Облачная инфраструктура на базе технологий VMware',
  access: 'legal',
  dataTestId: 'calculator-catalog-platform-enterprise',
};
