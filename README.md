# Cloud uikit [![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

Cloud uikit - библиотека компонентов (бизнес), в которой каждый компонент это отдельный npm-пакет, со своей версионностью и зависимостями.

# Storybook

[Storybook [Latest master].](https://cloud-ru-tech.github.io/uikit-product/)

# Snack uikit

[Snack Storybook [Latest master].](https://cloud-ru-tech.github.io/snack-uikit/)

# Design

[Figma](https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System)

# Browser support

![Chrome](storybook/assets/GoogleChromeLogo.svg)
![Firefox](storybook/assets/FirefoxLogo.svg)
![Chromium](storybook/assets/ChromiumLogo.svg)
![Safari](storybook/assets/SafariBrowserLogo.svg)

# Automation testing

![Chrome](storybook/assets/GoogleChromeLogo.svg)
![Firefox](storybook/assets/FirefoxLogo.svg)

# Styling:

## Import style:

1. Импортируем ConfigProvider:
   `import { ConfigProvider } from "@cloud-ru/uikit-product-utils";`
2. Оборачиваем проект: в theme передаем тему (deprecated), а в brand – брэнд по умолчанию:
   `<ConfigProvider theme={ConfigProvider.themes.Purple} brand={ConfigProvider.brand.Cloud}>...</ConfigProvider>`

## Change brand

1. Импортируем hook useBrand:
   `import { useBrand } from "@cloud-ru/uikit-product-utils";`

2. Используем callback для смены темы:

```js
const { Brand, changeBrand } = useBrand();
changeBrand(Brand.MLSpace);
```

## Change theme (deprecated)

1. Импортируем hook useTheme:
   `import { useTheme } from "@cloud-ru/uikit-product-utils";`

2. Используем callback для смены темы:

```js
const { changeTheme, Themes } = useTheme();
changeTheme(Themes.Purple);
```

# Contribution

[Contribution Guide](CONTRIBUTING.md)

# Changelog

Change log разбит по пакетам.
Вы можете посмотреть changelog либо в [Storybook](https://cloud-ru-tech.github.io/uikit-product/) или в `package` необходимого пакета

# Questions

Появились вопросы?
Возможно ответ на ваши вопросы содержится в [Contribution Guide](CONTRIBUTING.md).

# Issue Processes

1. Создан [новый issue](https://gitverse.ru/cloud-ru-tech/uikit-product/-/issues/new)
2. Issue рассмотрен на грумминге
   > Участники грумминга: Core team + Review team
   >
   > Частота грумминга: каждый вторник в 14:00.
   >
   > Если необходимо записаться на грумминг напишите любому члену Core Team

```
Если есть необходимость, всегда можно организовать внеочередной грумминг
```

3. После того как Issue пройдет этапы `Grooming` и in `Design`, попадает в `Ready for development` и готово к разработке. Может быть взято любой из команд в работу

# Team Duty

`Core team` - Ахременко Григорий, Белов Алексей, Козлова Анна, Хлупин Сергей, Ершов Никита

> Несет ответственность за техническую часть проекта.
>
> Определять развитие UIKIT
>
> Определяет вид кодовой базы компонентов
>
> Проводит Review-кода компонентов.
>
> Задачи Review team

---

`Team lead` - Ахременко Григорий

> Выстраивает процессы разработки.
>
> Занимается внешним развитием проекта.
>
> Занимается внутренним развитием проекта.

`Design lead` - Малокостов Игорь

> Определяет визуальную составляющую компонентов
>
> Лидит Design System
