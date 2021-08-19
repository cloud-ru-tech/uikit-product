import { BADGE } from '@geometricpanda/storybook-addon-badges';

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
    design: figmaUrl
      ? {
          type: 'figma',
          url: figmaUrl,
        }
      : undefined,
    badges: [BADGE.NEEDS_REVISION, BADGE.BETA],
    controls: { include: ['disabled'].concat(extraControlsInclude) },
  };
}

export function getDefaultArgs(extraArgs: Record<string, unknown> = {}) {
  return {
    disabled: false,
    ...extraArgs,
  };
}
