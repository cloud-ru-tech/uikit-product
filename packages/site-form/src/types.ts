import { ReactNode } from 'react';

import { WithLayoutType } from '@cloud-ru/uikit-product-utils';

type PredefinedFieldType =
  | 'name'
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'inn'
  | 'comment'
  | 'phone'
  | 'company'
  | 'position'
  | 'companyPositionOptional'
  | 'compamyPositionInnOptional'
  | 'participationFormat'
  | 'telegramLogin'
  | 'consentForExternalEvents'
  | 'middleName'
  | 'passport'
  | 'birthDate'
  | 'address'
  | 'naturalPerson'
  | 'callback'
  | 'offence'
  | 'territorialSubDivision'
  | 'industry';

export type FieldType = PredefinedFieldType | 'text';

type FieldSize = 'full' | 'half';

type FormFieldBase = {
  /** Ключ значения в данных формы вместо стандартного для `type` */
  name?: string;
  /** Имя поля в событии `onFieldFill` вместо стандартного для `type` */
  analyticsName?: string;
  /** Подпись поля вместо стандартной для `type` */
  label?: string;
  /**
   * Ширина поля: вся строка или половина. На мобильных поле всегда на всю строку
   * @default 'half'
   */
  size?: FieldSize;
  /** Обязательное поле */
  required?: boolean;
};

export type TextFormField = FormFieldBase & {
  type: 'text';
  /** Ключ значения в данных формы */
  name: string;
  /** Подпись поля */
  label: string;
  /** Подсказка под полем или во всплывающем окне */
  hint?: string;
  /** Показывать подсказку по нажатию на иконку */
  showHintIcon?: boolean;
  /** Максимальная длина значения. Проверяется при валидации без обрезки введенного текста */
  maxLength?: number;
};

export type FormField = (FormFieldBase & { type: PredefinedFieldType }) | TextFormField;

export type Option = {
  /** Значение опции */
  value: string;
  /** Текст опции */
  label: string;
  /** Уникальный ключ, если `value` может повторяться */
  key?: string;
  /** Опция недоступна для выбора */
  disabled?: boolean;
};

export type AgreementName =
  | 'site_services_consent'
  | 'online_event_consent'
  | 'education_consent'
  | 'partnership_services_consent';

export type AgreementLabels = {
  /** Текст чекбокса согласия на обработку персональных данных. Поддерживается HTML */
  userAgreement?: string;
  /** Текст чекбокса подписки на рассылку. Поддерживается HTML */
  checkboxSubscribe?: string;
};

export type MultipleComment = {
  /** Ключ значения в данных формы */
  name: string;
  /** Варианты выбора */
  options: Option[];
  /** Подпись поля */
  label: string;
};

export type CompanySuggestion = {
  /** Уникальный идентификатор компании */
  id: string;
  /** Название компании */
  company: string;
  /** ИНН компании */
  inn: string;
  /** Адрес компании, показывается в подсказке */
  address: string;
};

export type SiteFormValues = Record<string, unknown>;

export type SiteFormHelpers = {
  /** Показать ошибку под полем, например ответ сервера */
  setFieldError(name: string, message: string): void;
  /** Очистить форму */
  reset(): void;
};

export type SiteFormClickEvent = {
  /** Что кликнули: подпись контрола или выбранного значения */
  content: string;
  /** Идентификатор контрола */
  id: string;
};

export type SiteFormEvents = {
  /** Пользователь заполнил поле и ушел из него */
  onFieldFill?(fieldName: string): void;
  /** Клик по контролу формы: чекбоксу, радиокнопке, селекту, подсказке компании или кнопке отправки */
  onControlClick?(event: SiteFormClickEvent): void;
  /** Первый клик по форме. Вызывается один раз */
  onInteraction?(): void;
  /** Попытка отправить форму с ошибками валидации */
  onInvalidSubmit?(): void;
};

export type SiteFormContent = {
  /** Заголовок над формой */
  title?: string;
  /** Подзаголовок над формой */
  subtitle?: string;
  /**
   * Текст кнопки отправки
   * @default 'Отправить'
   */
  buttonTitle?: string;
  /** Текст между чекбоксами согласий и кнопкой отправки */
  footnote?: ReactNode;
};

export type SiteFormAgreement = {
  /**
   * Вариант согласия на обработку персональных данных: определяет имя чекбокса и ссылку на документ
   * @default 'site_services_consent'
   */
  name?: AgreementName;
  /** Тексты чекбоксов согласий вместо стандартных. Поддерживается HTML */
  labels?: AgreementLabels;
  /** Ссылка на документ согласия вместо стандартной для `name` */
  specialConsentLink?: string;
  /**
   * Показывать чекбокс согласия на обработку персональных данных
   * @default true
   */
  withUserAgreement?: boolean;
  /**
   * Показывать чекбокс подписки на рассылку
   * @default true
   */
  withSubscribeForMailing?: boolean;
  /**
   * Чекбокс подписки на рассылку обязателен для отправки
   * @default false
   */
  isSubscribeForMailingRequired?: boolean;
};

export type SiteFormProps = WithLayoutType<{
  /** Поля формы в порядке отображения */
  fields: FormField[];
  /** Мультиселект, который заменяет поле `comment` */
  multipleComment?: MultipleComment;
  /** Идет отправка: загрузка на кнопке, поля заблокированы */
  loading?: boolean;
  /** Отправка валидной формы */
  onSubmit(values: SiteFormValues, helpers: SiteFormHelpers): void | Promise<void>;
  /** Поиск компаний для подсказок в полях «Компания» и «ИНН». Без него поля работают как обычные инпуты */
  getCompanySuggestions?(query: string): Promise<CompanySuggestion[]>;

  /** Тексты формы */
  content?: SiteFormContent;
  /** Чекбоксы согласий */
  agreement?: SiteFormAgreement;
  /** Колбэки на действия пользователя, например для аналитики */
  events?: SiteFormEvents;
}>;
