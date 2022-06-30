import { PredefinedDecorIconPrivateProps, PredefinedIconsPrivateProps } from '../src';
import { Icons } from '../src/components/icon/constants';

describe('[Predefined Icon Private]:', () => {
  Object.entries(Icons).forEach(([name, icon]) => {
    const testId = `predefinedIcon-${name}-test`;

    function visit(props?: PredefinedIconsPrivateProps) {
      return cy.visitComponent({
        group: 'icons-predefined',
        name: 'predefined-icons-private',
        props: {
          'data-test-id': testId,
          ...(props || {}),
        },
      });
    }

    describe(`${name}:`, () => {
      it('Rendered', () => {
        visit({
          icon: icon as PredefinedIconsPrivateProps['icon'],
        });

        expect(cy.getByDataTestId(testId)).to.exist;
      });
    });
  });
});

describe('[Predefined Logos Private]:', () => {
  describe('ML Space Logo and SberCloud logo:', () => {
    function visit() {
      return cy.visitComponent({
        group: 'icons-predefined',
        name: 'predefined-logos-private',
      });
    }

    it('Rendered', () => {
      visit();

      expect(cy.getByDataTestId('icon-ml-space-full-logo')).to.exist;
      expect(cy.getByDataTestId('icon-sber-cloud-full-logo')).to.exist;
    });
  });
});

describe('[Predefined Decor Icon Private]:', () => {
  const testId = `predefinedDecorIcon-test`;

  function visit(props?: PredefinedDecorIconPrivateProps) {
    return cy.visitComponent({
      group: 'icons-predefined',
      name: 'predefined-decor-icon-private',
      props: {
        'data-test-id': testId,
        ...(props || {}),
      },
    });
  }

  it('Rendered', () => {
    visit();

    expect(cy.getByDataTestId(testId)).to.exist;
  });
});
