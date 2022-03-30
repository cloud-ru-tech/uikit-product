import { AvatarProps } from '../src';

describe('[Avatar]:', () => {
  const testId = 'avatar-test';

  function visit(
    props?: Omit<AvatarProps, 'variant' | 'status' | 'size'> & { variant?: string; status?: string; size?: string },
  ) {
    return cy.visitComponent({
      name: 'avatar',
      props: {
        'data-test-id': testId,
        ...(props || {}),
      },
    });
  }

  const names = [
    { init: 'Dmitriy Petrovich Dmitriev', result: 'DD' },
    { init: 'Anna Pupkina-Voitsekhvostova', result: 'AP' },
    { init: 'Freddie Mercury', result: 'FM' },
    { init: 'Dmitriy', result: 'DM' },
    { init: 'Dmitriy Ivanov', result: 'DI' },
  ];

  const name = names[0].init;

  it('Rendered', () => {
    visit();

    expect(cy.getByDataTestId(testId)).to.exist;
  });

  names.forEach(val => {
    it(`Abbreviation for "${val.init}" should be "${val.result}"`, () => {
      visit({
        name: val.init,
        variant: 'User',
        size: 'Large',
        src: undefined,
      });

      cy.getByDataTestId('avatar__content').should('contain.text', val.result);
    });
  });

  it('Is clickable', () => {
    visit({
      name,
      onClick() {},
    });

    cy.get('*[data-clickable="true"]').then($els => {
      const win = $els[0].ownerDocument.defaultView;

      if (win) {
        const after = win.getComputedStyle($els[0], 'after');
        expect(after).to.exist;
      }
    });
  });

  it('Variant "Company" has icon', () => {
    visit({
      name,
      variant: 'Company',
    });

    cy.get('*[data-variant="Company"]').within(() => {
      expect(cy.get('svg')).to.exist;
    });
  });

  it('Contains StatusDot', () => {
    visit({
      name,
      status: 'Online',
    });

    cy.get('[data-status]').within(() => {
      expect(cy.getByDataTestId('avatar__status')).to.exist;
    });
  });

  it('Contains image', () => {
    visit({
      name,
      src: 'just a test',
    });

    expect(cy.getByDataTestId('avatar__image')).to.exist;
  });
});

export {};
