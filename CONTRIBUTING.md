# CONTRIBUTION GUIDE

## Общие положения

- **ВСЕ НЕОБХОДИМЫЕ КОМАНДЫ ИМЕЮТСЯ В SCRIPTS**.
- Если вы все делаете правильно, поднятие и обновление зависимостей пакетов/пакетами происходит в автоматическом режиме, ровно как и changelog.
- Мы исходим из того, что любые изменения в данном репозитории вносятся согласно [Conventional Commits](https://conventionalcommits.org).

```text
The commit contains the following structural elements, to communicate intent to the consumers of your library:

fix: a commit of the type fix patches a bug in your codebase (this correlates with PATCH in Semantic Versioning).
feat: a commit of the type feat introduces a new feature to the codebase
(this correlates with MINOR in Semantic Versioning).
BREAKING CHANGE: a commit that has a footer BREAKING CHANGE:, or appends a ! after the type/scope, introduces a breaking
API change (correlating with MAJOR in Semantic Versioning). A BREAKING CHANGE can be part of commits of any type.
types other than fix: and feat: are allowed, for example @commitlint/config-conventional (based on the the Angular
convention) recommends build:, chore:, ci:, docs:, style:, refactor:, perf:, test:, and others.
footers other than BREAKING CHANGE: <description> may be provided and follow a convention similar to git trailer format.
```

- Любые изменения внесенные в удаленный репозиторий не мог быть перетерты через `git push --force` или аналогичные команды.
- Используется только пакетный менеджер `PNPM`, что бы установить его глобально выполните команду `npm install -g pnpm@latest-10`, для локальной установки выполните команду `npm i pnpm@latest-10`.
- Правило: один коммит - один пакет.

## Scripts

- `add-package` - создание нового пакета в рамках монорепозитория
- `build:storybook` - сборка исходников сторибука для *CI/CD* (на фича-ветках только изменные пакеты, на master-ветке полная сборка)
- `build:storybook:all` - сборка исходников сторибука для локального запуска (полная сборка)
- `build:packages:esm` - сборка ESM версии пакетов
- `build:packages:cjs` - сборка CommonJS версии пакетов
- `compile:packages` - компиляция пакетов через lerna
- `build:packages` - пересборка пакетов вместе с установкой пакетных зависимостей, глобальные должны быть при этом установлены
- `build:css` - сборка CSS файлов
- `changelog` - генерация changelog в измененных пакетах (используется только локально, дает возможность проверить корректность содержания коммитов) 
- `clean:all` - вызывает **clean:empty**, **clean:dist**, **clean:modules** и **clean:buildinfo**
- `clean:dist` - удаляет **dist** в пакетах
- `clean:modules` - удаляет **node_modules** в пакетах
- `clean:buildinfo` - удаляет **.tsbuildinfo** файлы
- `clean:empty` - удаляет пустые пакеты
- `docgen` - генерация документации для всех пакетов
- `deps` - устанавливает зависимости
- `deps:reinstall` - переустанавливает все зависимости начисто
- `storybook:all` - запуск локальной версии сторибука со *всеми* пакетами
- `storybook:partial` - запуск локальной версии сторибука с *определенными* пакетами
- `test:ci` - запуск playwright тестов для *CI/CD*
- `test:e2e:chrome` - запуск playwright тестов в Chrome
- `test:e2e:firefox` - запуск playwright тестов в Firefox
- `test:local` - запускает playwright в UI режиме
- `test:unit` - запуск unit тестов
- `transform:scope` - команда запуска скриптов по изменению скоупов у пакетов с приватного `@sbercloud/` на публичный `@cloud-ru/` для публикации в публичный npm + ссылок с gitlab на gitverse зеркало

## Структура проекта

1. все компоненты и утилиты лежат в папке `./packages`.
2. Структура папок пакетов:

```text
packages
  some-package
    src
      components
        Some
          index.ts
          Some.tsx
          styled.ts
          themes.ts
          constants.ts (опционально)
        index.ts
    stories
      Some.tsx
    package.json
    README.md
    CHANGELOG.md
```

## Сценарии

### Начало работы с репозиторием

1. `pnpm install` для получения всех уже объявленных зависимостей
2. `pnpm build:packages` для сборки пакетов

### Запуск локального storybook

1. `pnpm build:packages`
2. Для запуска storybook
   - со всеми пакетами `pnpm storybook:all`
   - с определенными пакетами `pnpm storybook:partial`

### Создание нового пакета

1. Создайте feature ветку от последнего master
2. Запустите команду `pnpm build:packages`
3. Запустите команду `pnpm add-package`
4. Реализуйте необходимый компонент или утилиту согласно Conventional commit approach
5. Создайте pull request
6. Получите аппрув
7. `git pull -r origin master`, если это необходимо
8. для релиза первой стабильной версии необходимо
   - `git fetch --all --prune --prune-tags `
   - запустить `pnpm changelog`
   - В сгенерированном диффе поправить версии на необходимые
   - сделать коммит
   - запустить `lerna version --exact --message "Version bump"`
9. Убедитесь, что все изменения актуальны и правильны
10. Смержите в master

### Внесение изменений в существующий пакет

1. Создайте feature или bugfix ветку от последнего master
2. Запустите команду `pnpm build:packages`
3. Внесите необходимые изменения согласно Conventional commit approach
4. Создайте pull request
5. Получите аппрув
6. Смержите вашу ветку в мастер.
7. Релиз пакетов произойдет на этапе CI, вам не нужно поднимать руками версии

### Docker Image

1. Запустите команду `pnpm deps && pnpm build:packages`
2. `docker build -t uikit:0.0.1 .`
3. `docker run -t -p 8080:80 uikit:0.0.1`
4. Откройте `http://localhost:8080/`

### Тестирование

1. Запустите локальный storybook через `storybook:ci`
2. Откройте `http://localhost:6006/` для проверки работоспособности
3. Запустите `test:local` для отображения Playwright UI интерфейса
4. В UI в левой части отобразится структура тестов в виде дерева. У каждого уровня есть зелёная кнопка Play. В зависимости от уровня клик по кнопке приведёт к запуску либо всех тестов уровня, либо конкретного теста.