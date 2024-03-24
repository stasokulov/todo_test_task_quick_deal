# App ToDo for Quick Deal

Тестовое задание по вакансии от компании "Quick Deal"

Ссылка на сайт: https://stasokulov.github.io/todo_test_task_quick_deal/

## Деплой на Github Pages

Создать папку docs, переместить туда содержимое папки dist, скопировать файл index.html и переименовать его в 404.html.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
