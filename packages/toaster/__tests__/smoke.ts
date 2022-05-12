import { ToasterBigProps, ToasterSmallProps } from '../src';
import { TOASTER_BIG_TEST_IDS, TOASTER_SMALL_TEST_IDS } from '../src/testIds';

describe('[Toaster]: Small', () => {
  const text = 'test toaster';

  function visit(props?: Omit<ToasterSmallProps, 'text'>) {
    return cy.visitComponent({
      group: 'toaster',
      name: 'toaster-small',
      props: {
        text,
        ...(props || {}),
      },
    });
  }

  it('Opened after click and have icon', () => {
    const status = 'Success' as ToasterSmallProps['status'];
    visit({
      status,
    });

    cy.getByDataTestId('trigger-toaster').click();

    cy.getByDataTestId(`${TOASTER_SMALL_TEST_IDS.main}__${status}`).should('exist');
    cy.getByDataTestId(TOASTER_SMALL_TEST_IDS.icon).should('exist');
  });

  it(`Should contain text "${text}"`, () => {
    const status = 'Success' as ToasterSmallProps['status'];
    visit({
      status,
    });

    cy.getByDataTestId('trigger-toaster').click();

    cy.getByDataTestId(TOASTER_SMALL_TEST_IDS.text).should('have.text', text);
  });

  it('Status "Neutral" has no icon', () => {
    const status = 'Neutral' as ToasterSmallProps['status'];
    visit({
      status,
    });

    cy.getByDataTestId('trigger-toaster').click();

    cy.getByDataTestId(TOASTER_SMALL_TEST_IDS.icon).should('not.exist');
  });
});

describe('[Toaster]: Big', () => {
  const testProps = {
    title: 'test toaster title',
    description: 'test toaster description',
    status: 'Info' as ToasterBigProps['status'],
  };
  const toasterDataTestId = `${TOASTER_BIG_TEST_IDS.main}__${testProps.status}`;

  function visit(props?: Omit<ToasterBigProps, 'title' | 'description' | 'status'>) {
    return cy.visitComponent<ToasterBigProps>({
      group: 'toaster',
      name: 'toaster-big',
      props: {
        ...testProps,
        ...(props || {}),
      },
    });
  }

  it(`Opened after click and closes automatically after 5 seconds`, () => {
    visit();

    cy.getByDataTestId('trigger-toaster').click();

    cy.getByDataTestId(toasterDataTestId).should('exist');

    // timeout is hardcoded because import from constants breaks cypress
    cy.getByDataTestId(toasterDataTestId, { timeout: 7000 }).should('not.exist');
  });

  it(`Description should be "${testProps.description}"`, () => {
    visit();

    cy.getByDataTestId('trigger-toaster').click();

    cy.getByDataTestId(TOASTER_BIG_TEST_IDS.description).should('exist').and('have.text', testProps.description);
  });

  it('Has ONE action and click on CLOSE button closes it', () => {
    visit();

    cy.getByDataTestId('trigger-toaster-one-action').click();

    cy.getByDataTestId(`${TOASTER_BIG_TEST_IDS.action}-0`).should('exist');

    cy.getByDataTestId(TOASTER_BIG_TEST_IDS.closeButton).click().should('not.exist');
  });

  it('Has ONE action and click on TOAST itself closes it', () => {
    visit();

    cy.getByDataTestId('trigger-toaster-one-action').click();

    cy.getByDataTestId(`${TOASTER_BIG_TEST_IDS.action}-0`).should('exist');

    cy.getByDataTestId(toasterDataTestId).click().should('not.exist');
  });

  it('Has ONE action and click on ACTION button closes it', () => {
    visit();

    cy.getByDataTestId('trigger-toaster-one-action').click();

    cy.getByDataTestId(`${TOASTER_BIG_TEST_IDS.action}-0`).should('exist').click();

    cy.getByDataTestId(toasterDataTestId).should('not.exist');
  });

  it('Has TWO action buttons', () => {
    visit();

    cy.getByDataTestId('trigger-toaster-two-actions').click();

    cy.getByDataTestId(`${TOASTER_BIG_TEST_IDS.action}-0`).should('exist');
    cy.getByDataTestId(`${TOASTER_BIG_TEST_IDS.action}-1`).should('exist');
  });
});
