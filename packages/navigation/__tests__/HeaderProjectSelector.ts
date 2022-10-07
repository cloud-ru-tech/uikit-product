import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

function getPage(story: string) {
  return getTestcafeUrl({ category: 'not-stable', group: 'navigation', name: 'header-project-selector', story });
}

function getReference() {
  return Selector(dataTestIdSelector('header-project-selector__reference'));
}

function getFloating() {
  return Selector(dataTestIdSelector('header-project-selector__floating'));
}

function getOutside() {
  return Selector('body');
}

function getActive() {
  return Selector(() => document.activeElement as HTMLElement);
}

function getSearch() {
  return Selector(dataTestIdSelector('header-project-selector__search')).find('input');
}

function getAction() {
  return Selector(dataTestIdSelector('header-project-selector__action'));
}

function getOptionListItems() {
  return Selector(dataTestIdSelector('header-project-selector__option-list-item'));
}

function getOptionListItemByValue(value: string) {
  return getOptionListItems().withAttribute('data-test-value', value);
}

function getOptionListItemEditButtonByValue(value: string) {
  return getOptionListItemByValue(value).find(
    dataTestIdSelector('header-project-selector__option-list-item-edit-button'),
  );
}

function getGroupListItemLabel() {
  return Selector(dataTestIdSelector('header-project-selector__group-list-item-label'));
}

function getProjectOptionListItemLabelByValue(value: string) {
  return getOptionListItemByValue(value).find(
    dataTestIdSelector('header-project-selector__project-option-list-item-label'),
  );
}

function getWorkspaceOptionListItemLabelByValue(value: string) {
  return getOptionListItemByValue(value).find(
    dataTestIdSelector('header-project-selector__workspace-option-list-item-label'),
  );
}

function getSelectedProject() {
  return Selector(dataTestIdSelector('header-project-selector__selected-project'));
}

function getNoData() {
  return Selector(dataTestIdSelector('header-project-selector__no-data'));
}

function getSelectedWorkspace() {
  return Selector(dataTestIdSelector('header-project-selector__selected-workspace'));
}

function basics() {
  test('opens floating by reference click', async t => {
    await t.click(getReference()).expect(getFloating().exists).ok();
  });

  test('opens floating by down arrow type on reference', async t => {
    await t.pressKey('tab down').expect(getFloating().exists).ok();
  });

  test('closes floating by click outside', async t => {
    await t.click(getReference()).click(getOutside()).expect(getFloating().exists).notOk();
  });

  test('closes floating by option select by mouse', async t => {
    await t.click(getReference()).click(getOptionListItemByValue('short-1')).expect(getFloating().exists).notOk();
  });

  test('closes floating by option select by keys', async t => {
    await t
      .pressKey('tab down down')
      .dispatchEvent(getActive(), 'keydown', { code: 'Enter', bubbles: true })
      .expect(getFloating().exists)
      .notOk();
  });

  test('closes floating by action click', async t => {
    await t.click(getReference()).click(getAction()).expect(getFloating().exists).notOk();
  });

  test('closes floating by edit option button click', async t => {
    await t
      .click(getReference())
      .hover(getOptionListItemByValue('short-1'))
      .click(getOptionListItemEditButtonByValue('short-1'))
      .expect(getFloating().exists)
      .notOk();
  });

  test('filters options when searching', async t => {
    await t
      .click(getReference())
      .typeText(getSearch(), 'zo')
      .expect(getOptionListItems().count)
      .eql(1)
      .expect(getOptionListItems().nth(0).textContent)
      .eql('Zork');
  });

  test('clears search at closing', async t => {
    await t
      .click(getReference())
      .typeText(getSearch(), 'zo')
      .click(getOutside())
      .click(getReference())
      .expect(getSearch().textContent)
      .eql('');
  });

  test('shows no data state when nothing found', async t => {
    await t.click(getReference()).typeText(getSearch(), 'zooo').expect(getNoData().visible).ok();
  });

  test('goes to last option when typing up arrow', async t => {
    await t.pressKey('tab up up').expect(getOptionListItems().nth(-1).visible).ok();
  });

  test('goes to last option when opening and it is selected', async t => {
    await t
      .click(getReference())
      .click(getOptionListItems().nth(-1))
      .click(getReference())
      .expect(getOptionListItems().nth(-1).visible)
      .ok();
  });

  test('renders group labels', async t => {
    await t.click(getReference()).expect(getGroupListItemLabel().exists).ok();
  });
}

fixture('HeaderProjectSelector/Projects').page(getPage('projects'));

basics();

test('renders selected project', async t => {
  await t.expect(getSelectedProject().textContent).eql('Zialactic');
});

test('selects another project by mouse', async t => {
  await t
    .click(getReference())
    .click(getOptionListItemByValue('short-1'))
    .expect(getSelectedProject().textContent)
    .eql('Zaggles');
});

test('selects another project by keys', async t => {
  await t
    .pressKey('tab down down')
    .dispatchEvent(getActive(), 'keydown', { code: 'Enter', bubbles: true })
    .expect(getSelectedProject().textContent)
    .eql('Zaggles');
});

test('does not select project by edit project button click', async t => {
  await t
    .click(getReference())
    .hover(getOptionListItemByValue('short-1'))
    .click(getOptionListItemEditButtonByValue('short-1'))
    .expect(getSelectedProject().textContent)
    .eql('Zialactic');
});

test('truncates long selected project label', async t => {
  const selectedProject = getSelectedProject();

  await t.click(getReference()).click(getOptionListItemByValue('long-0'));

  const [offsetWidth, scrollWidth] = await Promise.all([selectedProject.offsetWidth, selectedProject.scrollWidth]);

  await t.expect(offsetWidth).lte(scrollWidth);
});

test('truncates long project option label', async t => {
  const projectOptionListItemLabel = getProjectOptionListItemLabelByValue('long-0');

  await t.click(getReference());

  const [offsetWidth, scrollWidth] = await Promise.all([
    projectOptionListItemLabel.offsetWidth,
    projectOptionListItemLabel.scrollWidth,
  ]);

  await t.expect(offsetWidth).lte(scrollWidth);
});

fixture('HeaderProjectSelector/Workspaces').page(getPage('workspaces'));

basics();

test('renders selected selected workspace', async t => {
  await t.expect(getSelectedWorkspace().textContent).eql('Zialactic');
});

test('selects another workspace by mouse', async t => {
  await t
    .click(getReference())
    .click(getOptionListItemByValue('short-1'))
    .expect(getSelectedWorkspace().textContent)
    .eql('Zaggles');
});

test('selects another workspace by keys', async t => {
  await t
    .pressKey('tab down down')
    .dispatchEvent(getActive(), 'keydown', { code: 'Enter', bubbles: true })
    .expect(getSelectedWorkspace().textContent)
    .eql('Zaggles');
});

test('does not select workspace by edit workspace button click', async t => {
  await t
    .click(getReference())
    .hover(getOptionListItemByValue('short-1'))
    .click(getOptionListItemEditButtonByValue('short-1'))
    .expect(getSelectedWorkspace().textContent)
    .eql('Zialactic');
});

test('truncates long selected workspace label', async t => {
  const selectedWorkspace = getSelectedWorkspace();

  await t.click(getReference()).click(getOptionListItemByValue('long-0'));

  const [offsetWidth, scrollWidth] = await Promise.all([selectedWorkspace.offsetWidth, selectedWorkspace.scrollWidth]);

  await t.expect(offsetWidth).lte(scrollWidth);
});

test('truncates long workspace option label', async t => {
  const workspaceOptionListItemLabel = getWorkspaceOptionListItemLabelByValue('long-0');

  await t.click(getReference());

  const [offsetWidth, scrollWidth] = await Promise.all([
    workspaceOptionListItemLabel.offsetWidth,
    workspaceOptionListItemLabel.scrollWidth,
  ]);

  await t.expect(offsetWidth).lte(scrollWidth);
});
