import { fixture, Selector } from 'testcafe';

import { PredefinedIconsPrivateProps } from '@sbercloud/uikit-product-predefined-icons-private';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { Icon } from '../src/constants';

fixture('[Predefined Icon Private]:');

Object.entries(Icon).forEach(([name, icon]) => {
  const testId = `predefinedIcon-${name}-test`;

  const visit = (props?: PredefinedIconsPrivateProps) =>
    getTestcafeUrl({
      group: 'icons-predefined',
      name: 'predefined-icons-private',
      props: {
        'data-test-id': testId,
        ...(props || {}),
      },
    });

  test.page(visit({ icon }))(`Rendered ${name}`, async t => {
    await t.expect(Selector(dataTestIdSelector(testId)).exists).ok();
  });
});
