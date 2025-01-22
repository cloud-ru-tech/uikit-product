import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { WithLayoutType } from '@sbercloud/uikit-product-utils';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { SectionAccordion, SectionAccordionProps } from '../src';
import { SECTION_COLORS } from '../src/constants';
import { LAYOUT_TYPE } from './constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Site/Section/Accordion',
  component: SectionAccordion,
};

export default meta;

type StoryProps = SectionAccordionProps & WithLayoutType;

const Template: StoryFn<StoryProps> = ({
  title,
  items,
  selectionMode,
  layoutType,
  backgroundColor,
  outline,
  className,
}) => (
  <div className={styles.resizeWrapper}>
    <SectionAccordion
      title={title}
      items={items}
      selectionMode={selectionMode}
      layoutType={layoutType}
      backgroundColor={backgroundColor}
      outline={outline}
      className={className}
    />
  </div>
);

export const accordion: StoryObj<StoryProps> = {
  render: Template,
  args: {
    title: 'Ответы на вопросы',
    backgroundColor: SECTION_COLORS.NeutralBackground,
    layoutType: 'desktop',
    items: [
      {
        title: 'Что такое объектное хранилище S3?',
        description:
          '<p>Объектное хранилище — это масштабируемое решения для хранения данных любого типа и объема. В хранилище можно загружать медиафайлы, электронные письма, резервные копии, образы виртуальных машин и big data. Данные хранятся в исходном формате и размещаются в виде объектов.</p>',
      },
      {
        title: 'Какие данные можно хранить в Evolution Object Storage?',
        description:
          '<p>Вы можете загружать и хранить данные любого формата и объемом до 5 ТБ на один файл. Evolution Object Storage хранит данные в исходном виде, никак их не преобразовывая.</p>',
      },
      {
        title: 'Как защищены данные в хранилище?',
        description:
          '<p>Данные хранятся в зашифрованном виде в центрах обработки данных Cloud.ru с уровнем Tier III и аттестацией по ФЗ-152. Безопасность данных обеспечивается шифрованием на стороне сервера и клиента, проверкой URL-адресов, сетевой изоляцией на основе VPC, аудитом журналов и контролем прав доступа.</p>',
      },
      {
        title: 'Какие инструменты можно использовать для работы с Evolution Object Storage?',
        description: `
          <p>В личном кабинете вы можете создавать, удалять и менять параметры бакетов: класс хранения и максимальный размер, глобальное название и доменное имя.</p>
          <p>Через API или сторонние инструменты можно выполнять все основные операции с ресурсами хранилища и политиками, за исключением изменения класса хранения бакетов.</p>
          <br />
          <p>Инструкции:</p>
          <ul>
            <li>
              <a target="_blank" href="https://cloud.ru/docs/s3e/ug/topics/guides__bucket-create.html">Создание бакета</a>
            </li>
            <li>
              <a target="_blank" href="https://cloud.ru/docs/s3e/ug/topics/guides__bucket-delete.html">Удаление бакета</a>
            </li>
            <li>
              <a target="_blank" href="https://cloud.ru/docs/s3e/ug/topics/guides__bucket-edit.html">Изменение настроек бакета</a>
            </li>
            <li>
              <a target="_blank" href="https://cloud.ru/docs/s3e/ug/topics/api.html">Справочник API</a>
            </li>
            <li>
              <a target="_blank" href="https://cloud.ru/docs/s3e/ug/topics/tools.html">Популярные инструменты</a>
            </li>
          </ul>
        `,
      },
      {
        title: 'Как начать пользоваться Хранилищем S3?',
        description: `
          <ol>
            <li>
              <a target="_blank" href="https://id.cloud.ru/login">Заведите аккаунт.</a>
              <br />
              Вы получите бесплатное хранилище объемом 15 Гб.</li>
            <li>
              Создайте бакет.
              <br />
              Выберите тип хранилища и загрузите в него файлы с помощью встроенного файлового менеджера или API-клиента.
            </li>
            <li>
              Расширьте тариф.
              <br />
              Если место закончилось, вы можете расширить тариф.
            </li>
          </ol>
        `,
      },
    ],
  },
  argTypes: {
    backgroundColor: { control: { type: 'select' } },
    layoutType: {
      name: '[Story]: Layout type',
      options: Object.values(LAYOUT_TYPE),
      control: {
        type: 'radio',
      },
    },
    items: {
      description: 'Массив айтемов',
      table: {
        type: {
          detail: `item: string - Заголовок элемента\ndescription: string - Описание элемента (rich text)`,
        },
      },
    },
  },
  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/design/pCLrU1Wg1VsoMQGLmH1J8t/%5BLIB%5D%5BSITE%5D-Product-UI-Kit?node-id=7594-325916&t=GxZxsjdE4H96MiTh-11',
    },
  },
};
