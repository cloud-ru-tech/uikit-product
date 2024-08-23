# Contribution Guide

## Interface Icons System
Относится только к `./svgs/inherit/interface-icons-system`.

Отдельный скрипт необходим по причине уникальной структуры папок и названий файлов с иконками: `/svgs/inherit/interface-icons-system/{iconNameFolder}/{icon-name}-{size}.svg`.
Изначально данные приходят из Figma в некорректной структуре и с некорректным названием файлов: `Interface/{SIZE}/Icon Name.svg` (с пробелами в названиях, camelCase).

1. Выделяем в Figma все иконки на странице, экспортируем в формате .svg, получаем .zip архив со структурой `Interface/{SIZE}/{Icon Name}.svg`
2. Переименовываем корневую папку в `interface-icons-systems`, чтобы получилось `interface-icons-system/{SIZE}/{Icon Name}.svg`
3. Очищаем директорию `./packages/icons/import` или убеждаемся, что в ней не осталось папок с прошлого импорта
4. Копируем корневую папку в `./packages/icons/import`, чтобы получилось `./packages/icons/import/interface-icons-system`
5. Запускаем скрипт `import:icons-interface-system` из `./packages/icons/package.json`
6. Готово

## Interface Icons Product
Относится только к `./svgs/inherit/interface-icons-product`.

Отдельный скрипт необходим по причине уникальной структуры папок и названий файлов с иконками: `/svgs/inherit/interface-icons-product/{iconName}.svg`
Изначально данные приходят из Figma в некорректной структуре и с некорректным названием файлов: `Interface/S/Icon Name.svg` (с пробелами в названиях, camelCase).

1. Выделяем в Figma все иконки на странице, экспортируем в формате .svg, получаем .zip архив со структурой `Interface/S/{Icon Name}.svg`
2. Переименовываем корневую папку в `interface-icons-product`, чтобы получилось `interface-icons-product/S/{Icon Name}.svg`
3. Очищаем директорию `./packages/icons/import` или убеждаемся, что в ней не осталось папок с прошлого импорта
4. Копируем корневую папку в `./packages/icons/import`, чтобы получилось `./packages/icons/import/interface-icons-product`
5. Запускаем скрипт `import:icons-interface-product` из `./packages/icons/package.json`
6. Готово

## Все остальные иконки
Для того чтобы добавить новую иконку, нужно просто поместить ее в одну из существующих папок:
```text
svgs
    color
        logos
        other
    inherit
        display
        extension
        interface
        services
```
Или добавьте еще одну папку, в таком случае вам нужно дополнительно произвести следующие действия:
1. Добавить скрипт генерации компонентов в package.json, на подобии существующих. Данный скрипт также должен вызываться из скрипта `compile`
2. Добавить реэкспорт в файле `src/index.ts` из сгенеренной папки (чтобы папка сгенерировалась, в корне uikit можно: выполнить npm run all:cleaninstall или npm run build, либо внутри папки npm run compile)
3. Добавить сгенеренную папку под игнор гита в файле `src/components/.gitignore`
4. Добавить story в папке `stories`
5. Обновить данную доку :)
