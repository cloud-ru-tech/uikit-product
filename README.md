# Sbercloud uikit monorepo [![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
Ведется автоматическое версионирование на уровне пакетов (semantic).

## [Storybook.](https://uikit.test.devops.sbercloud.dev/?path=/story/components--logs-view)

## [Contribution Guide.](CONTRIBUTION.md)

## [TODO current version is outdated] Установка на локальный проект

1. Получить доступ к @sbercloud/uikit2.0
2. Создать `.npmrc` в корневой директории
   содержание `.npmrc`:
   `@sbercloud:registry=https://nexus.devops.sbercloud.dev/repository/sbercloud-ui/`
   `_auth={token}`
3. Установить необходимый пакет, например `npm i @sbercloud/uikit-react-button`.
4. Установить linaria
   `npm i --save-dev @linaria/babel-preset @linaria/core @linaria/react @linaria/shaker @linaria/webpack-loader`
5. Скопировать linaria.config.js в корневую директорию
6. Добавить в **webpack.config.js**:

```js
module: {
  rules: [
    {
      test: /\.js$/,
      include: /node_modules\/@sbercloud\/uikit2.0/,
      use: [
        {
          loader: 'babel-loader',
        },
        {
          loader: '@linaria/webpack-loader',
          options: {
            sourceMap: process.env.NODE_ENV !== 'production',
          },
        },
      ],
    },
  ];
}
```

7. Добавить в **babel.config.js**:

```js
env: {
  development: {
    presets: ['@linaria'];
  }
}
```

8. Добавить в **linaria.config.js**:

```js
rules: [
  {
    action: require('@linaria/shaker').default,
  },
  {
    test: /node_modules[\/\\](?!@sbercloud\/uikit2.0)/,
    action: 'ignore',
  },
];
```

# Styling:

## [TODO] Import Style:

1. Ипортируем необходимые темы:
   `import { globals, purple, purpleDark, ... } from "@sbercloud/uikit2.0/theme";`
2. Подключаем к проекту:
   `<body className={`${globals} ${purple} ${purpleDark}`} />...</body>`
3. Выбираем тему по умолчанию:
   `<html data-theme="purple">...</html>`

## Смена темы

1. Актуальная тема определена в `data-theme`, для смены темы меняем значения атрибута.
   Например(с помощью js):
   `htmlElement.setAttribute("data-theme", "purpleDark");`
   
