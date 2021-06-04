import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import { addReadme } from 'storybook-readme';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { MoreButton, MoreButtonProps } from '../src';

export default {
  title: 'Components/Button/More Button',
  component: MoreButton,
  decorators: [addReadme, withDesign],
} as Meta;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  margin: auto;
`;

const Template: Story<MoreButtonProps> = ({ ...args }) => (
  <Wrapper>
    {Object.values(MoreButton.placements).map(placement => (
      <>
        <span>{`placement "${placement}": `}</span>
        <MoreButton {...args} placement={placement} />
      </>
    ))}
  </Wrapper>
);

export const moreButton = Template.bind({});
moreButton.args = {
  actions: [
    { name: 'Удалить', onClick: () => {} },
    { name: 'Edit', onClick: () => {} },
    { name: 'A little bit longer string', onClick: () => {} },
  ],
};
moreButton.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
