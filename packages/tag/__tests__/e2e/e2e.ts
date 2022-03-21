describe('[E2E]: Tag/TagRow', () => {
  function visit() {
    cy.visit(
      `http://localhost:6006/iframe.html?id=components-tag-tag-row--tag-row&args=data-test-id:tag-row&viewMode=story`,
    );
  }

  it('renders correctly with tag cloud', () => {
    visit();

    cy.viewport(320, 568)
      .getByDataTestId('tag-row')
      .within(() => {
        cy.getByDataTestId('tag-cloud-trigger').should('exist').trigger('mouseenter');
      });
    cy.getByDataTestId('tag-cloud').should('exist');
  });
});

export {};
