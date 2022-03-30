describe('[Tag]: Tag Row', () => {
  it('renders correctly with tag cloud', () => {
    cy.visitComponent({
      group: 'tag',
      name: 'tag-row',
      props: {
        'data-test-id': 'tag-row',
      },
    });

    cy.viewport(320, 568)
      .getByDataTestId('tag-row')
      .within(() => {
        cy.getByDataTestId('tag-cloud-trigger').should('exist').trigger('mouseenter');
      });

    cy.getByDataTestId('tag-cloud').should('exist');
  });
});

export {};
