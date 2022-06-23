import { InputCommonProps, InputMaskProps, InputOverviewProps, InputPhoneProps, InputSecurityProps } from '../src';

type InputProps = InputCommonProps | InputOverviewProps | InputMaskProps | InputPhoneProps | InputSecurityProps;

type VisitCallback = (props: InputProps) => Cypress.Chainable<Cypress.AUTWindow>;

type Options = {
  isMasked: boolean;
};

const runCommonTests = (visitCb: VisitCallback, testId: string, options: Options) => {
  it('Should not allow data entry if disabled', () => {
    visitCb({
      onChange: () => {},
      disabled: true,
    });

    cy.getByDataTestId(testId).within(() => {
      cy.getByDataTestId('private-input').should('have.value', '').should('be.disabled');
    });
  });

  if (!options.isMasked) {
    it('Should limit amount of text characters in case a limit is set and should demonstrate a relevant indicator', () => {
      visitCb({
        onChange: () => {},
        maxLength: 2,
      });

      cy.getByDataTestId(testId).within(() => {
        const sampleText = '42';
        cy.getByDataTestId('input-wrapper__length-counter').should('contain', '0/2');

        cy.getByDataTestId('private-input').should('have.value', '').type(sampleText).should('have.value', sampleText);

        cy.getByDataTestId('input-wrapper__length-counter').should('contain', '2/2');

        cy.getByDataTestId('input__clear-button').click();

        cy.getByDataTestId('private-input').should('have.value', '').type('420').should('have.value', sampleText);
      });
    });
  }

  it('Renders tooltip when the label question mark icon is hovered with a mouse', () => {
    visitCb({
      onChange: () => {},
    });

    cy.getByDataTestId('input-wrapper__help-icon').should('not.exist');

    cy.getByDataTestId(testId).within(() => {
      cy.getByDataTestId('input-wrapper__label')
        .next('[data-test-trigger-id="tooltip__trigger-element"]')
        .trigger('mouseenter');
    });

    // Tooltip content is specified in a relevant Story
    cy.getByDataTestId('input-wrapper__help-icon').should('contain', 'Label tooltip content');
  });

  it('Renders without label, hint, placeholder and any other labels in case they are not specified', () => {
    const commonProps = {
      onChange: () => {},
      hint: undefined,
      label: undefined,
      error: undefined,
      optional: false,
    };
    const props = options.isMasked ? commonProps : { ...commonProps, placeholder: undefined };

    visitCb(props);

    cy.getByDataTestId(testId).within(() => {
      cy.getByDataTestId('input-wrapper__hint').should('not.exist');
      cy.getByDataTestId('input-wrapper__label').should('not.exist');
      cy.getByDataTestId('input-wrapper__error-reason').should('not.exist');
      cy.getByDataTestId('input-wrapper__optional-mark').should('not.exist');
      if (!options.isMasked) {
        cy.getByDataTestId('private-input').should('not.have.attr', 'placeholder');
      }
    });
  });

  it('Renders with label, hint, placeholder, error message and optional label in case they are specified', () => {
    const hintText = 'Some instructions here';
    const labelText = 'Field Label';
    const placeholderText = 'Enter something here';

    const commonProps = {
      onChange: () => {},
      hint: hintText,
      label: labelText,
      optional: true,
    };
    const props = options.isMasked ? commonProps : { ...commonProps, placeholder: placeholderText };

    visitCb(props);

    cy.getByDataTestId(testId).within(() => {
      cy.getByDataTestId('input-wrapper__hint').should('contain', hintText);
      cy.getByDataTestId('input-wrapper__label').should('contain', labelText);
      cy.getByDataTestId('input-wrapper__optional-mark').should('contain', 'Опционально');

      if (!options.isMasked) {
        cy.getByDataTestId('private-input').should('have.attr', 'placeholder', placeholderText);
      }
    });
  });

  it('Renders error text instead of hint', () => {
    const hintText = 'I will not be displayed';
    const errorText = 'Cannot be empty';

    visitCb({
      onChange: () => {},
      hint: hintText,
      error: errorText,
    });

    cy.getByDataTestId('input-wrapper__hint').should('not.exist');
    cy.getByDataTestId('input-wrapper__error-reason').should('contain', errorText);
  });
};

describe('[Input]:', () => {
  describe('Common:', () => {
    const testId = 'inputCommon-test';

    function visit(props?: InputCommonProps) {
      return cy.visitComponent({
        group: 'input',
        name: 'common',
        props: {
          'data-test-id': testId,
          ...(props || {}),
        },
      });
    }

    runCommonTests(
      props =>
        visit({
          ...props,
          onChange: () => {},
        }),
      testId,
      { isMasked: false },
    );
  });

  describe('Mask:', () => {
    const testId = 'inputMask-test';

    function visit(props?: InputMaskProps) {
      return cy.visitComponent({
        group: 'input',
        name: 'mask',
        props: {
          'data-test-id': testId,
          ...(props || {}),
        },
      });
    }

    describe('Phone:', () => {
      it('Should allow Russian phone format only and the clear button should remove entered value', () => {
        visit({
          onChange: () => {},
          mask: 'Phone' as InputMaskProps['mask'],
        });

        cy.getByDataTestId(testId).within(() => {
          cy.getByDataTestId('private-input')
            .should('have.value', '')
            .type('Test')
            .should('not.have.value', 'Test')
            .type('111222')
            .should('have.value', `+7 111 222-__-__`)
            .type('3344')
            .should('have.value', `+7 111 222-33-44`);

          cy.getByDataTestId('input__clear-button').click();

          cy.getByDataTestId('private-input').should('have.value', '+7 ___ ___-__-__');
        });
      });
    });

    describe('Passport:', () => {
      it('Should allow Russian passport format only and the clear button should remove entered value', () => {
        visit({
          onChange: () => {},
          mask: 'Passport' as InputMaskProps['mask'],
        });

        cy.getByDataTestId(testId).within(() => {
          cy.getByDataTestId('private-input')
            .should('have.value', '')
            .type('Test')
            .should('not.have.value', 'Test')
            .type('111122')
            .should('have.value', `1111 22____`)
            .type('3333')
            .should('have.value', `1111 223333`);

          cy.getByDataTestId('input__clear-button').click();

          cy.getByDataTestId('private-input').should('have.value', '____ ______');
        });
      });
    });

    describe('Snils:', () => {
      it('Should allow Russian snils number format only and the clear button should remove entered value', () => {
        visit({
          onChange: () => {},
          mask: 'Snils' as InputMaskProps['mask'],
        });

        cy.getByDataTestId(testId).within(() => {
          cy.getByDataTestId('private-input')
            .should('have.value', '')
            .type('Test')
            .should('not.have.value', 'Test')
            .type('1111')
            .should('have.value', `1111__-___ __`)
            .type('2233344')
            .should('have.value', `111122-333 44`);

          cy.getByDataTestId('input__clear-button').click();

          cy.getByDataTestId('private-input').should('have.value', '______-___ __');
        });
      });
    });

    describe('Confirmation code:', () => {
      it('Should allow 4 digit confirmation code only and the clear button should remove entered value', () => {
        visit({
          onChange: () => {},
          mask: 'ConfirmationCode' as InputMaskProps['mask'],
        });

        cy.getByDataTestId(testId).within(() => {
          cy.getByDataTestId('private-input')
            .should('have.value', '')
            .type('Test')
            .should('not.have.value', 'Test')
            .type('11')
            .should('have.value', `11__`)
            .type('22')
            .should('have.value', `1122`);

          cy.getByDataTestId('input__clear-button').click();

          cy.getByDataTestId('private-input').should('have.value', '____');
        });
      });
    });

    runCommonTests(
      props =>
        visit({
          ...props,
          onChange: () => {},
          mask: 'Phone' as InputMaskProps['mask'],
        }),
      testId,
      { isMasked: true },
    );
  });

  describe('Overview:', () => {
    const testId = 'inputOverview-test';

    function visit(props?: InputOverviewProps) {
      return cy.visitComponent({
        group: 'input',
        name: 'overview',
        props: {
          'data-test-id': testId,
          ...(props || {}),
        },
      });
    }

    it('Should allow data entry and the clear button should remove entered value', () => {
      visit({
        onChange: () => {},
        onMoreButtonClick: () => {},
      });

      cy.getByDataTestId(testId).within(() => {
        const sampleText = 'Hello world!';
        cy.getByDataTestId('private-input').should('have.value', '').type(sampleText).should('have.value', sampleText);

        cy.getByDataTestId('input__clear-button').click();

        cy.getByDataTestId('private-input').should('have.value', '');
      });
    });

    it('Should show a tooltip when the more button is hovered for several seconds', () => {
      const moreButtonTooltipText = 'More button tooltip text';

      visit({
        onChange: () => {},
        onMoreButtonClick: () => {},
        moreButtonTooltipText,
      });

      cy.getByDataTestId(testId).within(() => {
        cy.getByDataTestId('input__more-button').trigger('mouseenter');
      });

      cy.getByDataTestId('button-tooltip__ButtonIconBase').should('contain', moreButtonTooltipText);
    });

    runCommonTests(
      props =>
        visit({
          ...props,
          onChange: () => {},
          onMoreButtonClick: () => {},
        }),
      testId,
      { isMasked: false },
    );
  });

  describe('Phone:', () => {
    const testId = 'inputPhone-test';

    function visit(props?: InputPhoneProps) {
      return cy.visitComponent({
        group: 'input',
        name: 'phone',
        props: {
          'data-test-id': testId,
          ...(props || {}),
        },
      });
    }

    it('Should allow data entry in the phone format only', () => {
      visit({
        onChange: () => {},
      });

      cy.getByDataTestId(testId).within(() => {
        cy.getByDataTestId('private-input')
          .should('have.value', '')
          .type('Test')
          .should('not.have.value', 'Test')
          .type('111')
          .should('have.value', `111 XXX-XX-XX`)
          .type('2223344')
          .should('have.value', `111 222-33-44`);

        cy.getByDataTestId('input__clear-button').click();

        cy.getByDataTestId('private-input').should('have.value', 'XXX XXX-XX-XX');
      });
    });

    runCommonTests(
      props =>
        visit({
          ...props,
          onChange: () => {},
        }),
      testId,
      { isMasked: true },
    );
  });

  describe('Security:', () => {
    const testId = 'inputSecurity-test';

    function visit(props?: InputSecurityProps) {
      return cy.visitComponent({
        group: 'input',
        name: 'security',
        props: {
          'data-test-id': testId,
          ...(props || {}),
        },
      });
    }

    it('Should allow data entry but hide the value, and the show content button should reveal the protected value, and the clear button should remove the value', () => {
      visit({
        onChange: () => {},
      });

      cy.getByDataTestId(testId).within(() => {
        cy.getByDataTestId('private-input').should('have.value', '');

        cy.getByDataTestId('input__show-password-button').should('not.exist');

        const sampleText = 'Hello world!';
        cy.getByDataTestId('private-input')
          .type(sampleText)
          .should('have.value', sampleText)
          .should('have.attr', 'type', 'password');

        cy.getByDataTestId('input__show-password-button').click();

        cy.getByDataTestId('private-input').should('have.attr', 'type', 'text');

        cy.getByDataTestId('input__clear-button').click();

        cy.getByDataTestId('private-input').should('have.value', '');
      });
    });

    runCommonTests(
      props =>
        visit({
          ...props,
          onChange: () => {},
        }),
      testId,
      { isMasked: false },
    );
  });
});

export {};
