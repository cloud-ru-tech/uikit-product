# React Stepper

## Installation

`npm i @sbercloud/uikit-product-stepper`

[Changelog](./CHANGELOG.md)

Stepper

## Логика работы

Данный компонент при клике на какой-либо шаг выполняет следующую логику:

1. Клик по следующему шагу:
   1. Если следующий шаг больше текущего на 1, либо любой предыдущий, т.е. `nextStep <= currentStep + 1`, будет вызвана логика для проверки текущего шага
   2. Если следующий шаг больше текущего на 2 и более, то перехода на тот шаг не будет и проверка не будет вызвана
2. Проверка текущего шага:
   1. Если проверка выполнена успешно, то произойдет переход на следующий шаг
   2. Если проверка выполняется не успешно, то текущий шаг перейдет в ошибку, переход не будет выполнен, и сбросятся все последующие заполненные шаги

## Public API

```typescript
type ContextProps = {
   stepsCount: number;
   startStepIndex?: number;
   children: ReactNode;
};

type Step = {
   label: string;
   id: string;
   content: ReactNode;
};

type StepsProps = {
   steps: Step[];
   className?: string;
};

export type StepperContext = {
   stepsCount: number;
   currentStepIndex: number;
   moveForward(): void;
   moveToPrevStep(stepIndex: number): void;
   setValidator(validator: (step: number) => boolean): void;
   clearErrors(): void;
   raiseCurrentStepError(): void;
};

```
