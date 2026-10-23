// https://habr.com/ru/articles/110731/
const PHONE_REGULAR = /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d -]{10}$/;

const EMAIL_REGULAR = /^([a-zA-Z0-9-_]+(\.[a-zA-Z0-9-_]+)*|"[\w\s]+")@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/;

export const valSchema = {
  name: {
    required: {
      value: true,
      message: 'Введите имя',
    },
    maxLength: {
      value: 120,
      message: 'Превышено допустимое число символов',
    },
    pattern: {
      value: /^[A-Za-zА-ЯЁа-яё\s'-]+$/,
      message: 'Введите корректное имя',
    },
  },
  surname: {
    required: {
      value: true,
      message: 'Введите фамилию',
    },
    maxLength: {
      value: 120,
      message: 'Превышено допустимое число символов',
    },
    pattern: {
      value: /^[A-Za-zА-ЯЁа-яё\s'-]+$/,
      message: 'Введите корректную фамилию',
    },
  },
  secondName: {
    required: {
      value: true,
      message: 'Введите отчество',
    },
    maxLength: {
      value: 120,
      message: 'Превышено допустимое число символов',
    },
    pattern: {
      value: /^[A-Za-zА-ЯЁа-яё\s'-]+$/,
      message: 'Введите корректное отчество',
    },
  },
  position: {
    required: {
      value: true,
      message: 'Введите должность',
    },
    maxLength: {
      value: 300,
      message: 'Превышено допустимое число символов',
    },
  },
  address: {
    required: {
      value: true,
      message: 'Введите адрес',
    },
    maxLength: {
      value: 120,
      message: 'Превышено допустимое число символов',
    },
  },
  inn: {
    required: {
      value: true,
      message: 'Введите ИНН',
    },
    pattern: {
      value: /^[0-9]{10,12}$/,
      message: 'Введите корректный ИНН',
    },
  },
  kpp: {
    required: {
      value: true,
      message: 'Введите КПП',
    },
    pattern: {
      value: /^[0-9]{9}$/,
      message: 'Введите корректный КПП',
    },
  },
  phone: {
    required: {
      value: true,
      message: 'Введите номер телефона',
    },
    pattern: {
      value: /^\+7\d{10}$/,
      message: 'Введите корректный номер',
    },
  },
  phoneWithOutMask: {
    required: {
      value: true,
      message: 'Введите номер телефона',
    },
    pattern: {
      value: PHONE_REGULAR,
      message: 'Введите корректный номер',
    },
  },
  email: {
    required: {
      value: true,
      message: 'Введите email',
    },
    pattern: {
      value: EMAIL_REGULAR,
      message: 'Введите корректный email',
    },
  },
  corpEmail: {
    required: {
      value: true,
      message: 'Введите рабочий email',
    },
    pattern: {
      value: EMAIL_REGULAR,
      message: 'Введите корректный рабочий email',
    },
  },
  product: {
    required: {
      value: true,
      message: 'Введите название продукта',
    },
  },
  site: {
    required: {
      value: true,
      message: 'Введите сайт',
    },
  },
  company: {
    required: {
      value: true,
      message: 'Введите название организации',
    },
    maxLength: {
      value: 120,
      message: 'Превышено допустимое число символов',
    },
  },
  userAgreement: {
    required: {
      value: true,
      message: 'Подпишите согласие',
    },
  },
  passport: {
    required: {
      value: true,
      message: 'Введите паспорт',
    },
    pattern: {
      value: /^\d{10}$/,
      message: 'Введите корректный паспорт',
    },
  },
  birthDate: {
    required: {
      value: true,
      message: 'Введите дату рождения',
    },
    validate: (value?: string) => !value || new Date(value) <= new Date() || 'Введите корректную дату рождения',
  },
  telegram: {
    required: {
      value: true,
      message: 'Заполните поле',
    },
    pattern: {
      value: /^(?:@|https:\/\/t\.me\/|t\.me\/)?[a-zA-Z][a-zA-Z0-9_]{4,31}$/,
      message: 'Введите корректный Телеграм',
    },
    maxLength: {
      value: 45,
      message: 'Превышено допустимое число символов',
    },
  },
  default: {
    required: {
      value: true,
      message: 'Поле обязательно',
    },
  },
};
