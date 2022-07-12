function assertSelected(tabId: string) {
  const NavDataTestId = `tabs__navigation-list-item:${tabId}`;
  const ContentDataTestId = `tabs__content:${tabId}`;
  assert(cy.getByDataTestId(NavDataTestId).should('have.attr', 'data-selected', 'true'), `[${tabId}]: tab is selected`);
  assert(cy.getByDataTestId(ContentDataTestId).should('exist'), `[${tabId}]: tab content is shown`);
}

function assertNotSelected(tabId: string) {
  const NavDataTestId = `tabs__navigation-list-item:${tabId}`;
  const ContentDataTestId = `tabs__content:${tabId}`;
  assert(
    cy.getByDataTestId(NavDataTestId).should('have.attr', 'data-selected', 'false'),
    `[${tabId}]: tab is not selected`,
  );
  assert(cy.getByDataTestId(ContentDataTestId).should('not.exist'), `[${tabId}]: tab content is not shown`);
}

describe('[Tabs]:', () => {
  const testId = 'tabsTest';

  it('Rendered', () => {
    cy.visitComponent({
      name: 'tabs',
      props: {
        'data-test-id': testId,
      },
    });

    expect(cy.getByDataTestId(testId)).to.exist;
  });

  it('Synced selected tab and content', () => {
    const firstTabNavItem = 'tabs__navigation-list-item:id1';
    cy.visitComponent({
      name: 'tabs',
    });
    assertNotSelected('id1');

    cy.getByDataTestId(firstTabNavItem).click();

    assertSelected('id1');
  });

  it('Disabled tab selection prevented', () => {
    const disabledTabNavItem = 'tabs__navigation-list-item:id3';

    cy.visitComponent({
      name: 'tabs',
    });
    assertSelected('id2');
    assertNotSelected('id3');
    assert(
      cy.getByDataTestId(disabledTabNavItem).should('have.attr', 'data-disabled', 'true'),
      `[id3]: tab is disabled`,
    );

    cy.getByDataTestId(disabledTabNavItem).click();

    assertSelected('id2');
    assertNotSelected('id3');
  });

  it('Press "enter" or "space" on focused tab should select it, other keys don\'t', () => {
    const firstTab = 'tabs__navigation-list-item:id1';
    const secondTab = 'tabs__navigation-list-item:id2';

    cy.visitComponent({
      name: 'tabs',
    });
    assertSelected('id2');
    assertNotSelected('id1');

    cy.getByDataTestId(firstTab).focus().type('{enter}');

    assertSelected('id1');
    assertNotSelected('id2');

    cy.getByDataTestId(secondTab).focus().type(' ');

    assertSelected('id2');
    assertNotSelected('id1');

    cy.getByDataTestId(firstTab).focus().type('AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz');

    assertSelected('id2');
    assertNotSelected('id1');
  });

  it('Scroll navigation tabs', () => {
    const testId = 'tabsTest';
    const sixId = 'tabs__navigation-list-item:id6__label';
    const elevenId = 'tabs__navigation-list-item:id11__label';
    const fifteenId = 'tabs__navigation-list-item:id15__label';

    cy.visitComponent({
      name: 'tabs',
      props: {
        'data-test-id': testId,
      },
    });

    cy.getByDataTestId(fifteenId).should('not.be.visible');

    cy.getByDataTestId(elevenId).click('center');

    cy.getByDataTestId(fifteenId).should('be.visible');

    cy.getByDataTestId(sixId).click('center');

    cy.getByDataTestId(fifteenId).should('not.be.visible');
  });
});

export {};
