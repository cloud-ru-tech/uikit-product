describe('[Avatar]:', () => {
  before(() => cy.visit('http://localhost:6006/iframe.html?id=components-avatar--avatar&viewMode=story'));

  it('Rendered', () => {
    expect(cy.getByDataTestId('avatar__inner')).to.exist;
  });

  it('Is clickable', () => {
    cy.get('*[data-clickable="true"]').then($els => {
      const win = $els[0].ownerDocument.defaultView;

      if (win) {
        const after = win.getComputedStyle($els[0], 'after');
        expect(after).to.exist;
      }
    });
  });

  it('Variant "company" has icon', () => {
    expect(cy.get('*[data-variant="Company"]').find('svg')).to.exist;
  });

  it('Contains StatusDot', () => {
    expect(cy.get('[data-status]').getByDataTestId('avatar__status')).to.exist;
  });
});

export {};
