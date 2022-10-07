import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const testId = 'avatar__test';
const contentId = 'avatar__content';
const statusId = 'avatar__status';
const imageId = 'avatar__image';

const names = [
  { init: 'Dmitriy Petrovich Dmitriev', result: 'DD' },
  { init: 'Anna Pupkina-Voitsekhvostova', result: 'AP' },
  { init: 'Freddie Mercury', result: 'FM' },
  { init: 'Dmitriy', result: 'DM' },
  { init: 'Dmitriy Ivanov', result: 'DI' },
];

const name = names[0].init;

const visit = (
  props?: Partial<{ variant: string; status: string; size: string; name: string; src: string; onClick: object }>,
) =>
  getTestcafeUrl({
    name: 'avatar',
    props: {
      'data-test-id': testId,
      ...props,
    },
  });

fixture('Avatar');

test.page(visit())('Rendered', async t => {
  await t.expect(Selector(dataTestIdSelector(contentId)).exists).ok();
});

names.forEach(name =>
  test.page(
    visit({
      name: name.init,
      variant: 'User',
      size: 'Large',
      src: undefined,
    }),
  )(`Rendered ${name.init}`, async t => {
    await t.expect(Selector(dataTestIdSelector(contentId)).innerText).contains(name.result);
  }),
);

test.page(
  visit({
    name,
    variant: 'Company',
  }),
)('Variant "Company" has icon', async t => {
  await t.expect(Selector('*[data-variant="Company"]').find('svg').exists).ok();
});

test.page(
  visit({
    name,
    status: 'Online',
  }),
)('Contains StatusDot', async t => {
  await t.expect(Selector('[data-status]').find(dataTestIdSelector(statusId)).exists).ok();
});

test.page(
  visit({
    name,
    src: 'just a test',
  }),
)('Contains image', async t => {
  await t.expect(Selector(dataTestIdSelector(imageId)).exists).ok();
});
