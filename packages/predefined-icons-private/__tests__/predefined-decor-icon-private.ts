import { fixture, Selector } from 'testcafe';

import { DecorIconProps, PredefinedDecorIconProps } from '@sbercloud/uikit-product-predefined-icons-private';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { PredefinedDecorIconType } from '../src/components/decor/constants';
import { Icon } from '../src/constants';

fixture('[Predefined Decor Icon Private]:');

type StoryProps = Omit<DecorIconProps, 'icon'> | PredefinedDecorIconProps;

const testId = `predefinedDecorIcon-test`;

const visit = (testId: string, props?: StoryProps) =>
  getTestcafeUrl({
    group: 'icons-predefined',
    name: 'predefined-decor-icon-private',
    props: {
      'data-test-id': testId,
      ...(props || {}),
    },
  });

test.page(
  visit(testId, {
    type: PredefinedDecorIconType.Custom,
  }),
)(`Rendered`, async t => {
  await t.expect(Selector(dataTestIdSelector(testId)).exists).ok();
});

Object.entries(Icon).forEach(([name, icon]) => {
  const testId = `predefinedDecorIcon-${name}-test`;

  test.page(
    visit(testId, {
      icon,
      type: PredefinedDecorIconType.Predefined,
    }),
  )(`Rendered ${name}`, async t => {
    await t.expect(Selector(dataTestIdSelector(testId)).exists).ok();
  });
});
