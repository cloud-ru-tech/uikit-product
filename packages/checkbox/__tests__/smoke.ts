describe('[Checkbox]:', () => {
  before(() =>
    cy.visitComponent({
      group: 'checkbox',
      name: 'checkbox',
    }),
  );

  it('Rendered', () => {
    expect(cy.getByDataTestId('checkbox__icon')).to.exist;
  });

  it('Checked after click', () => {
    cy.getByDataTestId('checkbox__icon').click();
    expect(cy.getByDataTestId('icon-checkbox-checked')).to.exist;
  });
});

export {};
