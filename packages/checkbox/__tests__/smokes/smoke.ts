describe('[SMOKE]: Checkbox', () => {
  before(() =>
    cy.visit('http://localhost:6006/iframe.html?id=components-checkbox-checkbox--checkbox&args=&viewMode=story'),
  );
  it('Rendered', () => {
    expect(cy.getByDataTestId('checkbox__icon')).to.exist;
  });
});

export {};
