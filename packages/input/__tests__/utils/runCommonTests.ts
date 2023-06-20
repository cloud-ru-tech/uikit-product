import { Selector } from 'testcafe';

import { dataTestIdSelector } from '../../../../testcafe/utils';

export type VisitCallback = (props: Record<string, unknown>) => string;

type Options = {
  isMasked: boolean;
};

export const runCommonTests = (visit: VisitCallback, testId: string, options: Options) => {
  test.page(
    visit({
      onChange: () => {},
      disabled: true,
    }),
  )('Should not allow data entry if disabled', async t => {
    const wrapper = Selector(dataTestIdSelector(testId));
    const input = wrapper.find(dataTestIdSelector('private-input'));

    await t.typeText(input, '123').expect(input.value).eql('').expect(input.hasAttribute('disabled')).ok();
  });

  if (!options.isMasked) {
    test.page(
      visit({
        onChange: () => {},
        maxLength: 2,
      }),
    )(
      'Should limit amount of text characters in case a limit is set and should demonstrate a relevant indicator',
      async t => {
        const wrapper = Selector(dataTestIdSelector(testId));
        const lengthCounter = wrapper.find(dataTestIdSelector('input-wrapper__length-counter'));
        const input = wrapper.find(dataTestIdSelector('private-input'));
        const clearButton = wrapper.find(dataTestIdSelector('input__clear-button'));
        const sampleText = '42';

        await t.expect(lengthCounter.textContent).eql('0/2');

        await t
          .expect(input.value)
          .eql('')
          .typeText(input, sampleText)
          .expect(input.value)
          .eql(sampleText)
          .expect(lengthCounter.textContent)
          .eql('2/2');

        await t.click(clearButton).expect(input.value).eql('').expect(lengthCounter.textContent).eql('0/2');

        await t.typeText(input, '420').expect(input.value).eql(sampleText);
      },
    );
  }

  test.page(
    visit({
      onChange: () => {},
    }),
  )('Renders tooltip when the label question mark icon is hovered with a mouse', async t => {
    const wrapper = Selector(dataTestIdSelector(testId));
    const tooltip = wrapper
      .find(dataTestIdSelector('input-wrapper__label'))
      .nextSibling('[data-test-trigger-id="tooltip__trigger-element"]');
    const helpIcon = Selector(dataTestIdSelector('input-wrapper__help-icon'));

    await t.expect(helpIcon.exists).notOk();

    await t.hover(tooltip).expect(helpIcon.exists).ok().expect(helpIcon.textContent).eql('Label tooltip content');
  });

  test.page(
    visit({
      onChange: () => {},
      hint: undefined,
      label: undefined,
      error: undefined,
      optional: false,
      ...(options.isMasked ? {} : { placeholder: undefined }),
    }),
  )('Renders without label, hint, placeholder and any other labels in case they are not specified', async t => {
    const wrapper = Selector(dataTestIdSelector(testId));
    const hint = wrapper.find(dataTestIdSelector('input-wrapper__hint'));
    const label = wrapper.find(dataTestIdSelector('input-wrapper__label'));
    const error = wrapper.find(dataTestIdSelector('input-wrapper__error-reason'));
    const mark = wrapper.find(dataTestIdSelector('input-wrapper__optional-mark'));

    await t
      .expect(hint.exists)
      .notOk()
      .expect(label.exists)
      .notOk()
      .expect(error.exists)
      .notOk()
      .expect(mark.exists)
      .notOk();

    if (!options.isMasked) {
      const input = wrapper.find(dataTestIdSelector('private-input'));
      await t.expect(input.hasAttribute('placeholder')).notOk();
    }
  });

  test.page(
    visit({
      onChange: () => {},
      hint: 'Some instructions here',
      label: 'Field Label',
      optional: true,
      ...(options.isMasked ? {} : { placeholder: 'Enter something here' }),
    }),
  )('Renders with label, hint, placeholder, error message and optional label in case they are specified', async t => {
    const wrapper = Selector(dataTestIdSelector(testId));
    const input = wrapper.find(dataTestIdSelector('private-input'));
    const hint = wrapper.find(dataTestIdSelector('input-wrapper__hint'));
    const label = wrapper.find(dataTestIdSelector('input-wrapper__label'));
    const mark = wrapper.find(dataTestIdSelector('input-wrapper__optional-mark'));

    await t
      .expect(hint.textContent)
      .eql('Some instructions here')
      .expect(label.textContent)
      .eql('Field Label')
      .expect(mark.textContent)
      .eql('Опционально');

    if (!options.isMasked) {
      await t
        .expect(input.hasAttribute('placeholder'))
        .ok()
        .expect(input.getAttribute('placeholder'))
        .eql('Enter something here');
    }
  });

  test.page(
    visit({
      onChange: () => {},
      hint: 'I will not be displayed',
      error: 'Cannot be empty',
    }),
  )('Renders error text instead of hint', async t => {
    const wrapper = Selector(dataTestIdSelector(testId));
    const hint = wrapper.find(dataTestIdSelector('input-wrapper__hint'));
    const error = wrapper.find(dataTestIdSelector('input-wrapper__error-reason'));

    await t.expect(hint.exists).notOk().expect(error.textContent).eql('Cannot be empty');
  });
};
