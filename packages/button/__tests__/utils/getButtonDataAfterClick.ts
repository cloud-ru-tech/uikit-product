import { Selector } from 'testcafe';

import { dataTestIdSelector } from '../../../../testcafe/utils';

type ButtonData = {
  svgId: string;
  innerText: string;
};

const getButtonData = async (button: Selector): Promise<ButtonData> => {
  const svgId = (await button.find('svg').getAttribute('data-test-id')) || '';
  const innerText = await button.innerText;
  return { svgId, innerText };
};

export const getButtonDataAfterClick = async ({ t, testId }: { t: TestController; testId: string }) => {
  const button = Selector(dataTestIdSelector(testId));

  const prev = await getButtonData(button);

  await t.click(button);

  const current = await getButtonData(button);

  return { prev, current };
};
