describe('[SMOKE]: Tag/Tag', () => {
  function visit({ showRemoveButton }: { showRemoveButton: boolean }) {
    cy.visit(
      `http://localhost:6006/iframe.html?id=components-tag-tag--tag&args=showRemoveButton:${showRemoveButton};data-test-id:tag&viewMode=story`,
    );
  }

  it('renders correctly without remove button', () => {
    visit({ showRemoveButton: false });

    cy.getByDataTestId('tag').within(() => {
      cy.getByDataTestId('tag-text').should('exist').getByDataTestId('tag-remove-button').should('not.exist');
    });
  });

  it('renders correctly with remove button', () => {
    visit({ showRemoveButton: true });

    cy.getByDataTestId('tag').within(() => {
      cy.getByDataTestId('tag-text').should('exist').getByDataTestId('tag-remove-button').should('exist');
    });
  });
});

export {};
