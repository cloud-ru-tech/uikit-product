import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const TEST_ID = 'stepper-test';

function getPage(props?: Record<string, unknown>) {
  return getTestcafeUrl({
    name: 'stepper',
    props: {
      'data-test-id': TEST_ID,
      ...props,
    },
  });
}

fixture('Stepper').page(getPage());

test('Move forward by clicking exact step', async t => {
  await t
    .expect(Selector(dataTestIdSelector(`stepper__step-0`)).find('div:first-of-type[data-current="true"]').exists)
    .eql(true);

  await t.click(Selector(dataTestIdSelector(`stepper__step-1`)).find('div:first-of-type'));

  await t
    .expect(Selector(dataTestIdSelector(`stepper__step-1`)).find('div:first-of-type[data-current="true"]').exists)
    .eql(true);
});

test('Move forward twice by clicking the last step has no result', async t => {
  await t
    .expect(Selector(dataTestIdSelector(`stepper__step-0`)).find('div:first-of-type[data-current="true"]').exists)
    .eql(true);

  await t.click(Selector(dataTestIdSelector(`stepper__step-2`)).find('div:first-of-type'));

  await t
    .expect(Selector(dataTestIdSelector(`stepper__step-0`)).find('div:first-of-type[data-current="true"]').exists)
    .eql(true);
});

test('Move twice back by clicking the first step while staying at the last step has result', async t => {
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

test('Move forward by clicking the next step button and backward by clicking the previous step button', async t => {
  await t
    .expect(Selector(dataTestIdSelector(`stepper__step-0`)).find('div:first-of-type[data-current="true"]').exists)
    .eql(true);

  await t.click(Selector(dataTestIdSelector(`move-forward`)));

  await t
    .expect(Selector(dataTestIdSelector(`stepper__step-1`)).find('div:first-of-type[data-current="true"]').exists)
    .eql(true);

  await t.click(Selector(dataTestIdSelector(`move-backward`)));

  await t
    .expect(Selector(dataTestIdSelector(`stepper__step-0`)).find('div:first-of-type[data-current="true"]').exists)
    .eql(true);
});

test('If errors are present it is impossible to move to next step', async t => {
  const firstStepDot = Selector(dataTestIdSelector(`stepper__step-0`)).find('div:first-of-type[data-current="true"]');

  await t.expect(firstStepDot.exists).ok();
  await t.expect(firstStepDot.hasAttribute('data-error')).notOk();

  await t.expect(Selector(dataTestIdSelector(`input-wrapper__error-reason`)).exists).notOk();

  await t.typeText(Selector(dataTestIdSelector(`private-input`)), '1');
  await t.click(Selector(dataTestIdSelector(`stepper__step-1`)).find('div:first-of-type'));

  await t.expect(Selector(dataTestIdSelector(`input-wrapper__error-reason`)).exists).ok();
  await t.expect(Selector(dataTestIdSelector(`input-wrapper__error-reason`)).textContent).contains('error');
  await t.expect(firstStepDot.hasAttribute('data-error')).ok();
  await t
    .expect(Selector(dataTestIdSelector(`stepper__step-1`)).find('div:first-of-type[data-current="true"]').exists)
    .notOk();
});
