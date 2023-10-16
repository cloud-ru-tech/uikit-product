import { BADGE } from '#storybookConstants';

import componentChangelog from '../../CHANGELOG.md';
import componentPackage from '../../package.json';
import componentReadme from '../../README.md';

export function getDefaultParameters({
  figmaUrl,
  extraControlsInclude = [],
}: {
  figmaUrl?: string;
  extraControlsInclude?: string[];
} = {}) {
  return {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: figmaUrl
      ? {
          type: 'figma',
          name: 'Figma',
          url: figmaUrl,
        }
      : undefined,
    badges: [BADGE.STABLE],
    controls: { include: ['disabled'].concat(extraControlsInclude) },
  };
}

export function getDefaultArgs(extraArgs: Record<string, unknown> = {}) {
  return {
    ...extraArgs,
  };
}
