import { Meta, StoryObj } from '@storybook/react';
import cn from 'classnames';
import { useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Grade, RateForm, RateFormProps } from '../src';
import styles from './styles.module.scss';

const meta: Meta = { title: 'Console/Claudia/RateForm', component: RateForm };
export default meta;

type StoryProps = RateFormProps;

const GRADES: Grade[] = [
  { id: 'very-bad', icon: '😠', description: 'Ужасно' },
  { id: 'bad', icon: '😕', description: 'Плохо' },
  { id: 'ok', icon: '😐', description: 'Нормально' },
  { id: 'good', icon: '😃', description: 'Хорошо' },
  { id: 'very-good', icon: '🤩', description: 'Отлично' },
];

const Template = ({ ...props }: StoryProps) => {
  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null);
  const [savedComment, setSavedComment] = useState<string>('');

  const handleGradeClick = (grade: Grade) => {
    setSelectedGrade(grade);
  };

  const handleCommentSubmit = (value: string) => {
    setSavedComment(value);
  };

  const handleClose = () => {
    setSelectedGrade(null);
    setSavedComment('');
    alert('Форма закрыта');
  };

  return (
    <div>
      <div className={cn(styles.wrapper)}>
        <RateForm
          {...props}
          grades={GRADES}
          selectedGrade={selectedGrade}
          comment={savedComment}
          onGradeClick={handleGradeClick}
          onCommentSubmit={handleCommentSubmit}
          onClose={handleClose}
        />
      </div>
    </div>
  );
};

export const rateForm: StoryObj<StoryProps> = {
  render: Template,
  args: {
    grades: GRADES,
    title: 'Оцените качество ответа',
    ratedLabel: 'Вы поставили',
    ratedSubtitle: 'Спасибо за вашу оценку!',
    commentPlaceholder: 'Расскажите подробнее...',
    submitTooltipText: 'Отправить',
    isLoading: false,
    showCloseButton: true,
    isTouchDevice: false,
  },
  argTypes: {
    title: { control: 'text', description: 'Заголовок формы (показывается когда оценка не выбрана)' },
    ratedLabel: { control: 'text', description: 'Текст "Вы поставили"' },
    ratedSubtitle: { control: 'text', description: 'Подзаголовок после выбора оценки' },
    commentPlaceholder: { control: 'text', description: 'Плейсхолдер для поля комментария' },
    submitTooltipText: { control: 'text', description: 'Текст тултипа для кнопки отправки' },
    isLoading: { control: 'boolean', description: 'Состояние загрузки' },
    showCloseButton: { control: 'boolean', description: 'Показывать ли кнопку закрытия' },
    isTouchDevice: { control: 'boolean', description: 'Является ли устройство тач-девайсом' },
  },
  parameters: {
    readme: { sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog] },
    packageName: componentPackage.name,
    design: { name: 'Figma', type: 'figma', url: 'https://www.figma.com/design/SZjPEs7Ac3a2wS0HapamrE/Product-UI-Kit' },
  },
};
