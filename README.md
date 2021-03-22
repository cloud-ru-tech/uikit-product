# Getting started

## Установка на локальный проект

1. Получить доступ к @sbercloud/uikit2.0
2. Создать `.npmrc` в корневой директории
   содержание `.npmrc`:
   `@sbercloud:registry=https://nexus.devops.sbercloud.dev/repository/sbercloud-ui/`
   `_auth={token}`
3. Установить пакет. `yarn add @sbercloud/uikit2.0`
4. Установить linaria
   `yarn add -D @linaria/babel-preset @linaria/core @linaria/react @linaria/shaker @linaria/webpack-loader`
5. Скопировать linaria.config.js в корневую директорию
6. Добавить в **webpack.config.js**:

```js
resolve: {
   alias: {
      react: path.resolve(__dirname, "node_modules", "react"),
      "react-dom": path.resolve(__dirname, "node_modules", "react-dom"),
      "@linaria/react": path.resolve(
         __dirname,
         "node_modules",
         "@linaria/react"
      ),
      "@linaria/core": path.resolve(
         __dirname,
         "node_modules",
         "@linaria/core"
      ),
   },
},
...
plugins: [
   new webpack.ProvidePlugin({
      React: "react",
   }),
]
...
module: {
   rules: [
      {
         test: /\.js$/,
         include: /node_modules\/@sbercloud\/uikit2.0/,
         use: [
         {
            loader: "babel-loader",
         },
         {
            loader: "@linaria/webpack-loader",
            options: {
               sourceMap: process.env.NODE_ENV !== "production",
            },
         },
         ],
      },
   ]
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

## Запуск через yarn link

1. Создать глобальный symlink на пакет `yarn link`
2. Создать вспомогательные директории `yarn prepack`
3. Запустить сборку в watch режиме `yarn build:watch`
4. Из директории проекта залинковать пакет `yarn link @sbercloud/uikit2.0`
   **Для отвязки**:
5. Из директории проекта разлинковать пакет `yarn unlink @sbercloud/uikit2.0`
6. Удалить вспомогательные директории `yarn clean`

---

# Import

## Import components

`import { ... } from "@sbercloud/uikit2.0/components"`

## Import theme

`import { ... } from "@sbercloud/uikit2.0/theme"`

## Import typography

`import { ... } from "@sbercloud/uikit2.0/typography"`

## Import utils

`import { ... } from "@sbercloud/uikit2.0/utils"`

---

# Styling:

## Import Style:

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

---

# Storybook

## Запуск Storybook

1. Выполнить команду `yarn storybook`
