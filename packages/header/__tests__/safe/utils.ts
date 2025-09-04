import { getSelectProjectOption } from './selectors';

export async function verifySelectedProject({
  t,
  options,
  selected,
}: {
  t: TestController;
  options: string[];
  selected: string;
}) {
  for (const option of options) {
    if (option === selected) {
      await t
        .expect(getSelectProjectOption(option).getAttribute('data-checked'))
        .eql('true', `project "${option}" is not selected`);
    } else {
      await t
        .expect(getSelectProjectOption(option).hasAttribute('data-checked'))
        .eql(false, `project "${option}" is selected by mistake`);
    }
  }
}

export async function verifyFilteredProject({
  t,
  presentOptions,
  hiddenOptions,
}: {
  t: TestController;
  presentOptions: string[];
  hiddenOptions: string[];
}) {
  for (const option of presentOptions) {
    await t.expect(getSelectProjectOption(option).exists).ok(`project "${option}" is missing`);
  }

  for (const option of hiddenOptions) {
    await t.expect(getSelectProjectOption(option).exists).notOk(`project "${option}" is present`);
  }
}
