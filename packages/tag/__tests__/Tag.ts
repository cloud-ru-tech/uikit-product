describe('[Tag]: Tag', () => {
  const testId = 'tag-test';

  function visit(props?: { showRemoveButton: boolean }) {
    cy.visitComponent({
      group: 'tag',
      name: 'tag',
      props: {
        'data-test-id': testId,
        ...(props || {}),
      },
    });
  }

  it('renders correctly without remove button', () => {
    visit({ showRemoveButton: false });

    cy.getByDataTestId(testId).within(() => {
      cy.getByDataTestId('tag-text').should('exist').getByDataTestId('tag-remove-button').should('not.exist');
    });
  });

  it('renders correctly with remove button', () => {
    visit({ showRemoveButton: true });

    cy.getByDataTestId(testId).within(() => {
      cy.getByDataTestId('tag-text').should('exist').getByDataTestId('tag-remove-button').should('exist');
    });
  });
});

export {};
