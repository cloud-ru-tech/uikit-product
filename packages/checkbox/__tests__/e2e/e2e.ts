describe('[E2E]: Checkbox', () => {
  before(() =>
    cy.visit('http://localhost:6006/iframe.html?id=components-checkbox-checkbox--checkbox&args=&viewMode=story'),
  );
  it('Checked after click', () => {
    cy.getByDataTestId('checkbox__icon').click();
    expect(cy.getByDataTestId('icon-checkbox-checked')).to.exist;
  });
});

export {};
