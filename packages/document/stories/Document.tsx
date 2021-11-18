import { css } from '@linaria/core';
import { Meta, Story } from '@storybook/react/types-6-0';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Document, DocumentProps } from '../src';

export default {
  title: 'Not stable/Document',
  component: Document,
} as Meta;

const documentClassName = css`
  margin-bottom: 20px;
`;

const DOCUMENTS: DocumentProps[] = [
  {
    file: {
      name: 'test.zip',
      size: 374329606,
      MIMEType: 'application/zip',
    },
  },
  {
    file: {
      name: 'testfile.txt',
      size: 764456,
    },
  },
  {
    file: {
      name: 'document.html',
      displayName: 'download html file on click',
      path: '/',
    },
  },
  {
    file: {
      name: 'test.csv',
      displayName: 'super-duper very long custom document title',
      size: 764456,
      MIMEType: 'text/csv',
    },
  },
  {
    file: {
      name: 'test.jpg',
    },
    disabled: true,
  },
];

const Template: Story<DocumentProps> = ({ disabled }) => (
  <>
    {DOCUMENTS.map(doc => (
      <Document key={doc.file.name} {...doc} disabled={doc.disabled || disabled} className={documentClassName} />
    ))}
  </>
);

export const document = Template.bind({});
document.args = {};
document.argTypes = {
  disabled: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
};
document.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U/%F0%9F%94%A5%5BLIB%5D-Product-Design-System?node-id=1373%3A34238',
  },
};
