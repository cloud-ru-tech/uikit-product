import { styled } from '@linaria/react';
import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

import { ButtonIconTransparent, RefreshButton } from '@sbercloud/uikit-product-button';
import { InfoInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { notification } from '@sbercloud/uikit-product-notification';
import { EXPORT_VARS, GLOBAL_CSS_COLOR } from '@sbercloud/uikit-product-theme';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { TextField, TextFieldProps } from '../src';
import { Types } from '../src/components/constants';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 20px;

  box-sizing: border-box;
  padding: 16px;
  border: 1px solid var(${EXPORT_VARS.GREY[100]});
  border-radius: 10px;
  background-color: var(${GLOBAL_CSS_COLOR.BACKGROUND_SECONDARY});
`;

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const DEFAULT_ARGS = {
  text: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне.\nLorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.',
  extraIcons: (
    <>
      <ButtonIconTransparent icon={<InfoInterfaceSVG />} tooltip={{ content: 'Инфо' }} />
      <RefreshButton />
    </>
  ),
  'data-test-id': 'testId',
  allowCopy: true,
  onRequestSecuredField: undefined,
};

const SECURED_ARGS = { ...DEFAULT_ARGS, type: Types.Password };

const meta: Meta = {
  title: 'Components/Text Field',
  component: TextField,
};
export default meta;

function Template({ ...args }: TextFieldProps) {
  const [text, setText] = useState(args.text);

  const onRequestSecuredField = async () => {
    await delay(2000);

    setText('securedText');

    return { text: 'securedText' };
  };

  const onRequestSecuredFieldWithError = async () => {
    try {
      await delay(2000);

      throw new Error('some error occured');
    } catch (e: unknown) {
      notification.big.error({ title: 'Произошла ошибка при загрузке поля' });
      return { preventAction: true };
    }
  };

  return (
    <Container>
      <div>Обычное текстовое поле с контроллами</div>
      <TextField {...args} />

      <div>Текстовое поле с подгрузкой значения поля при нажатии на глазик и копировать</div>
      <TextField
        {...SECURED_ARGS}
        text={text}
        onRequestSecuredField={onRequestSecuredField}
        data-test-id='secured-content-preloading'
      />

      <div>Текстовое поле с ошибкой при подгрузке значения поля при нажатии на глазик и копировать</div>
      <TextField {...SECURED_ARGS} onRequestSecuredField={onRequestSecuredFieldWithError} />
    </Container>
  );
}

export const textField: StoryFn<TextFieldProps> = Template.bind({});

textField.args = DEFAULT_ARGS;
textField.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=2860%3A41940',
  },
  badges: [BADGE.STABLE],
};
