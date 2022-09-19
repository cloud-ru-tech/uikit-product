import { NotificationBigProps, NotificationSmallProps } from '../src';
import { NOTIFICATION_BIG_TEST_IDS, NOTIFICATION_SMALL_TEST_IDS } from '../src/testIds';

describe('[Notification]: Small', () => {
  const text = 'test notification';

  function visit(props?: Omit<NotificationSmallProps, 'text'>) {
    return cy.visitComponent({
      group: 'notification',
      name: 'notification-small',
      props: {
        text,
        ...(props || {}),
      },
    });
  }

  const status = 'Success' as NotificationSmallProps['status'];

  it('Opened after click and have icon', () => {
    visit({
      status,
    });

    cy.getByDataTestId('trigger-notification').click();

    cy.getByDataTestId(`${NOTIFICATION_SMALL_TEST_IDS.main}__${status}`).should('exist');
    cy.getByDataTestId(NOTIFICATION_SMALL_TEST_IDS.icon).should('exist');
  });

  it(`Should contain text "${text}"`, () => {
    visit({
      status,
    });

    cy.getByDataTestId('trigger-notification').click();

    cy.getByDataTestId(NOTIFICATION_SMALL_TEST_IDS.text).should('have.text', text);
  });

  it('Status "Neutral" has no icon', () => {
    visit({
      status: 'Neutral' as NotificationSmallProps['status'],
    });

    cy.getByDataTestId('trigger-notification').click();

    cy.getByDataTestId(NOTIFICATION_SMALL_TEST_IDS.icon).should('not.exist');
  });

  it('Should update after "update button" click', () => {
    visit({
      status,
    });

    cy.getByDataTestId('trigger-notification').click();
    cy.getByDataTestId(NOTIFICATION_SMALL_TEST_IDS.text).invoke('text').as('prevText');
    cy.getByDataTestId(NOTIFICATION_SMALL_TEST_IDS.icon).invoke('html').as('prevIcon');

    cy.getByDataTestId('update-notification').click();
    cy.getByDataTestId(NOTIFICATION_SMALL_TEST_IDS.text).invoke('text').as('newText');
    cy.getByDataTestId(NOTIFICATION_SMALL_TEST_IDS.icon).invoke('html').as('newIcon');

    cy.get('@prevText').then(prevText => {
      cy.get('@newText').then(newText => {
        expect(prevText).not.to.eq(newText);
      });
    });

    cy.get('@prevIcon').then(prevIcon => {
      cy.get('@newIcon').then(newIcon => {
        expect(prevIcon).not.to.eq(newIcon);
      });
    });
  });

  it('"Loading" notification does not close automatically -> "Loading" closes after update', () => {
    const loadingStatus = 'Loading';
    const errorStatus = 'Error';
    visit({
      status: loadingStatus as NotificationSmallProps['status'],
    });

    cy.getByDataTestId('trigger-notification').click();

    cy.getByDataTestId(`${NOTIFICATION_SMALL_TEST_IDS.main}__${loadingStatus}`, { timeout: 7000 })
      .should('exist')
      .then(() => {
        cy.getByDataTestId('update-notification').click();
        cy.getByDataTestId(`${NOTIFICATION_SMALL_TEST_IDS.main}__${errorStatus}`).should('exist');
        cy.getByDataTestId(`${NOTIFICATION_SMALL_TEST_IDS.main}__${errorStatus}`, { timeout: 7000 }).should(
          'not.exist',
        );
      });
  });
});

describe('[Notification]: Big', () => {
  const testProps = {
    title: 'test notification title',
    description: 'test notification description',
    status: 'Info' as NotificationBigProps['status'],
  };
  const notificationDataTestId = `${NOTIFICATION_BIG_TEST_IDS.main}__${testProps.status}`;

  function visit(props?: Omit<NotificationBigProps, 'title' | 'description' | 'status'>) {
    return cy.visitComponent<NotificationBigProps>({
      group: 'notification',
      name: 'notification-big',
      props: {
        ...testProps,
        ...(props || {}),
      },
    });
  }

  it(`Opened after click and closes automatically after 5 seconds`, () => {
    visit();

    cy.getByDataTestId('trigger-notification').click();

    cy.getByDataTestId(notificationDataTestId).should('exist');

    // timeout is hardcoded because import from constants breaks cypress
    cy.getByDataTestId(notificationDataTestId, { timeout: 7000 }).should('not.exist');
  });

  it(`Description should be "${testProps.description}"`, () => {
    visit();

    cy.getByDataTestId('trigger-notification').click();

    cy.getByDataTestId(NOTIFICATION_BIG_TEST_IDS.description).should('exist').and('have.text', testProps.description);
  });

  it('Has ONE action and click on CLOSE button closes it', () => {
    visit();

    cy.getByDataTestId('trigger-notification-one-action').click();

    cy.getByDataTestId(`${NOTIFICATION_BIG_TEST_IDS.action}-0`).should('exist');

    cy.getByDataTestId(NOTIFICATION_BIG_TEST_IDS.closeButton).click().should('not.exist');
  });

  it('Has ONE action and click on NOTIFICATION itself closes it', () => {
    visit();

    cy.getByDataTestId('trigger-notification-one-action').click();

    cy.getByDataTestId(`${NOTIFICATION_BIG_TEST_IDS.action}-0`).should('exist');

    cy.getByDataTestId(notificationDataTestId).click().should('not.exist');
  });

  it('Has ONE action and click on ACTION button closes it', () => {
    visit();

    cy.getByDataTestId('trigger-notification-one-action').click();

    cy.getByDataTestId(`${NOTIFICATION_BIG_TEST_IDS.action}-0`).should('exist').click();

    cy.getByDataTestId(notificationDataTestId).should('not.exist');
  });

  it('Has TWO action buttons', () => {
    visit();

    cy.getByDataTestId('trigger-notification-two-actions').click();

    cy.getByDataTestId(`${NOTIFICATION_BIG_TEST_IDS.action}-0`).should('exist');
    cy.getByDataTestId(`${NOTIFICATION_BIG_TEST_IDS.action}-1`).should('exist');
  });

  it('Should update after "update button" click', () => {
    const infoTitle = 'Перенос данных завершен';
    const successTitle = 'Обновлен';
    const notificationInfoId = 'notification-big__Info';
    const notificationSuccessId = 'notification-big__Success';
    visit();

    cy.contains(infoTitle).should('not.exist');
    cy.contains(successTitle).should('not.exist');
    cy.getByDataTestId(notificationInfoId).should('not.exist');
    cy.getByDataTestId(notificationSuccessId).should('not.exist');

    cy.getByDataTestId('trigger-notification-two-actions')
      .click()
      .then(() => {
        cy.getByDataTestId(notificationInfoId).should('exist').contains(infoTitle);
        cy.contains(successTitle).should('not.exist');
        cy.getByDataTestId(notificationSuccessId).should('not.exist');
      });

    cy.getByDataTestId('update-notification-two-actions')
      .click()
      .then(() => {
        cy.getByDataTestId(notificationSuccessId).should('exist').contains(successTitle);
        cy.contains(infoTitle).should('not.exist');
        cy.getByDataTestId(notificationInfoId).should('not.exist');
      });
  });
});
