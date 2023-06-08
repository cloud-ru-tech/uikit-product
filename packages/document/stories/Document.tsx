import { css } from '@linaria/core';
import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Document, DocumentProps } from '../src';
import { getRemoveButtonProps } from './helpers/getRemoveButtonProps';

const meta: Meta = {
  title: 'Components/Document',
  component: Document,
};
export default meta;

const documentSmallClassName = css`
  margin-bottom: 20px;
  max-width: 356px;
`;

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
    'data-test-id': 'no-mime-type',
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
      displayName: 'super-duper very long custom document title with max-width',
      size: 764456,
      MIMEType: 'text/csv',
    },
    removeButton: {
      onClick() {},
      tooltip: {
        content: 'Удалить',
      },
    },
    className: documentSmallClassName,
    'data-test-id': 'long-title',
  },
  {
    file: {
      name: 'test.jpg',
    },
    removeButton: {
      onClick() {},
      tooltip: {
        content: 'Удалить',
      },
    },
    disabled: true,
  },
];

function Template({ disabled, ...props }: DocumentProps) {
  const [hasDownloadButtonBeenClicked, setHasDownloadButtonBeenClicked] = useState<boolean>(false);
  const [hasRemoveButtonBeenClicked, setHasRemoveButtonBeenClicked] = useState<boolean>(false);

  return (
    <>
      <div>Controlled:</div>
      <br />

      <Document
        disabled={disabled}
        className={documentSmallClassName}
        {...props}
        onClick={() => setHasDownloadButtonBeenClicked(true)}
        removeButton={getRemoveButtonProps(props, () => setHasRemoveButtonBeenClicked(true))}
        {...(hasDownloadButtonBeenClicked ? { 'data-test-download-clicked': true } : {})}
        {...(hasRemoveButtonBeenClicked ? { 'data-test-remove-clicked': true } : {})}
      />

      <br />
      <div>Examples:</div>
      <br />

      {DOCUMENTS.map(doc => (
        <Document
          key={doc.file.name}
          {...doc}
          disabled={doc.disabled || disabled}
          className={doc.className || documentClassName}
        />
      ))}
    </>
  );
}

export const document: StoryFn<DocumentProps> = Template.bind({});
document.args = {
  file: {
    name: 'test.zip',
    size: 374329606,
    MIMEType: 'application/zip',
  },
  removeButton: {
    tooltip: {
      content: 'test',
    },
    onClick() {},
  },
};
document.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  badges: [BADGE.STABLE],
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=1373%3A33830',
  },
};
