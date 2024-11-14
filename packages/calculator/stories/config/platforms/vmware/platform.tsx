import { PLATFORM, Platform } from '@sbercloud/uikit-product-calculator';
import { VmwareSVG } from '@sbercloud/uikit-product-icons';

export const VM_WARE_PLATFORM: Platform = {
  id: PLATFORM.VmWare,
  icon: <VmwareSVG />,
  label: 'Облако VMware',
  description: 'Облачная инфраструктура на базе технологий VMware',
  access: 'legal',
  dataTestId: 'calculator-catalog-platform-enterprise',
};
