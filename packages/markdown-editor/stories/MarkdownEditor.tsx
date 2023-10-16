import { css } from '@linaria/core';
import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { MarkdownEditor, MarkdownEditorProps } from '../src';

const meta: Meta = {
  title: 'Not stable/Markdown Editor',
  component: MarkdownEditor,
};
export default meta;

const viewClassName = css`
  padding: 10px;
`;

const editorClassName = css`
  height: 400px !important;
`;

const markdown =
  "### Заголовок\n\nОписание\n\n> Цитата\n\n---\n\n**Список**\n\n1. Один\n\n2. Два\n\n3. `inline-code`\n\n```python\ndef open_images_base64(img_strs):\n  return np.array(Image.open(BytesIO(base64.b64decode(img_strs))).convert('RGB'))[:,:,::-1]\n\ndef create_image(img):\n  buffered = BytesIO()\n  img.save(buffered, format='JPEG')\n  img_str = base64.b64encode(buffered.getvalue()).decode('latin1')\n  return img_str\n```\n\n[Ссылка](https://aicloudnamespace.s3pd02.sbercloud.ru/aicloud-frontend/ai-services-colorization-1.png)\n\n![ai-services-colorization-3.png](https://aicloudnamespace.s3pd02.sbercloud.ru/aicloud-frontend/ai-services-colorization-3.png)\n\r\n\r| **Classifier** | **Link** | **F1-score (gesture)** |\n| :--- | :--- | :--- |\n| ResNet18 | https://sc.link/KEnx  | 98.72     |\n| ResNet152 | https://sc.link/O9rr  | 99.11     |\n| ResNeXt50 | https://sc.link/GKjJ  | 98.99     |\n| ResNeXt101 | https://sc.link/JXmg  | 99.28 |\n| MobileNetV3_small | https://sc.link/XVEg  | 96.78     |\n| MobileNetV3_large | https://sc.link/YXG2  | 97.88     |\n| Vitb32 | https://sc.link/XV4g  | 98.49     |\n\r";

function Template({ mode, ...args }: MarkdownEditorProps) {
  const [value, setValue] = useState(markdown);

  return (
    <MarkdownEditor
      {...args}
      mode={mode}
      value={value}
      onChange={setValue}
      className={mode === MarkdownEditor.modes.View ? viewClassName : editorClassName}
    />
  );
}

export const markdownEditor: StoryFn<MarkdownEditorProps> = Template.bind({});

markdownEditor.args = {
  mode: MarkdownEditor.modes.View,
};

markdownEditor.argTypes = {
  value: {
    control: false,
  },
  onChange: {
    control: false,
  },
  mode: {
    options: Object.values(MarkdownEditor.modes),
    control: {
      type: 'radio',
    },
  },
};

markdownEditor.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
