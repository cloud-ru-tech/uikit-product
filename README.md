# Sbercloud uikit monorepo [![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

Ведется автоматическое версионирование на уровне пакетов (semantic).

## [Storybook [Latest master].](https://uikit.test.devops.sbercloud.dev/)

## [Storybook [Poc stand].](http://192.168.67.22:32333/)

## Обязательно к изучению до начала работы: [Contribution Guide](CONTRIBUTION.md). Если после этого остались вопросы напишите в слак [канал](https://ai-sbercloud.slack.com/archives/C0114075H1B).

## Установка на локальный проект

1. Получить доступ к @sbercloud/uikit2.0
2. Создать `.npmrc` в корневой директории
   содержание `.npmrc`:
   `@sbercloud:registry=https://nexus.devops.sbercloud.dev/repository/sbercloud-ui/`
   `_auth={token}`
3. При использовании `linaria` Добавить в `linaria.config.js` секцию:

```
rules: [
  {
    action: require('@linaria/shaker').default,
  },
  {
    test: filePath =>
    !new RegExp(
      `@sbercloud\\${path.sep}uikit-(theme|typography)\\${path.sep}dist\\${path.sep}esm`,
    ).test(filePath) && /node_modules/.test(filePath),
    action: 'ignore',
  },
]
```

4. Установить необходимый пакет, например `npm i @sbercloud/uikit-react-button`.

# Styling:

## Import Style:

1. Ипортируем необходимые темы:
   `import { globals, purple, purpleDark, ... } from "@sbercloud/uikit-theme";`
2. Подключаем к проекту:
   `<body className={`${globals} ${purple} ${purpleDark}`} />...</body>`
3. Выбираем тему по умолчанию:
   `<html data-theme="purple">...</html>`

## Смена темы

1. Актуальная тема определена в `data-theme`, для смены темы меняем значения атрибута.
   Например(с помощью js):
   `htmlElement.setAttribute("data-theme", "purpleDark");`

```

```
