import { AdvancedSVG, CloudSVG, EvolutionSVG, VmwareSVG } from '@sbercloud/uikit-product-icons';

import { Item } from '../../types';
import { PlatformType } from './SelectorPlatformDropList';

export const PLATFORMS: { [key in PlatformType]: Item } = {
  evolution: {
    id: 'evolution',
    title: 'Evolution',
    icon: EvolutionSVG,
    tooltipText:
      'Платформа собственной разработки с доступом к IaaS- и PaaS-сервисам, вычислительным мощностям с GPU, аренде выделенных физических серверов и AI-инструментам.',
  },
  advanced: {
    id: 'advanced',
    title: 'Advanced',
    icon: AdvancedSVG,
    tooltipText:
      'Вендорская платформа с широким набором IaaS- и PaaS-сервисов от одного из лидеров мирового рынка облачных услуг.',
  },
  vmware: {
    id: 'vmware',
    title: 'Облако VMware',
    icon: VmwareSVG,
    tooltipText:
      'Вендорская платформа, предоставляющая инфраструктуру как услугу, основанную на технологиях VMware — ведущего поставщика решений IaaS.',
  },
  all: {
    id: 'all',
    title: 'Все платформы',
    icon: CloudSVG,
    tooltipText:
      'Совокупность сервисов, программных и/или аппаратных средств, решающих определенную задачу или группу задач.',
  },
};
