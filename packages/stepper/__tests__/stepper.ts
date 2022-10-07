import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { StepperProps } from '../src/components/types';

const TEST_ID = 'stepper-test';
function getPage(props?: Partial<StepperProps>) {
  return getTestcafeUrl({
    name: 'stepper',
    props: {
      'data-test-id': TEST_ID,
      ...props,
    },
  });
}

fixture('Stepper').page(getPage());

test('Move forward', async t => {
  await t
    .expect(Selector(dataTestIdSelector(`stepper__step-0`)).find('div:first-of-type[data-current="true"]').exists)
    .eql(true);

  await t.click(Selector(dataTestIdSelector(`stepper__step-1`)).find('div:first-of-type'));

  await t
    .expect(Selector(dataTestIdSelector(`stepper__step-1`)).find('div:first-of-type[data-current="true"]').exists)
    .eql(true);
});

test('Move forward twice has no result', async t => {
  await t
    .expect(Selector(dataTestIdSelector(`stepper__step-0`)).find('div:first-of-type[data-current="true"]').exists)
    .eql(true);

  await t.click(Selector(dataTestIdSelector(`stepper__step-2`)).find('div:first-of-type'));

  await t
    .expect(Selector(dataTestIdSelector(`stepper__step-0`)).find('div:first-of-type[data-current="true"]').exists)
    .eql(true);
});

test('Move twice back has result', async t => {
  await t
    .expect(Selector(dataTestIdSelector(`stepper__step-0`)).find('div:first-of-type[data-current="true"]').exists)
    .eql(true);
  await t.click(Selector(dataTestIdSelector(`stepper__step-1`)).find('div:first-of-type'));
  await t.click(Selector(dataTestIdSelector(`stepper__step-2`)).find('div:first-of-type'));
  await t
    .expect(Selector(dataTestIdSelector(`stepper__step-2`)).find('div:first-of-type[data-current="true"]').exists)
    .eql(true);

  await t.click(Selector(dataTestIdSelector(`stepper__step-0`)).find('div:first-of-type'));

  await t
    .expect(Selector(dataTestIdSelector(`stepper__step-0`)).find('div:first-of-type[data-current="true"]').exists)
    .eql(true);
});
