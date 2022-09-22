import { SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_FULL_WIDTH } from '../src/components/Sidebar/constants';

describe('[Navigation]: Sidebar', () => {
  const sidebarTestId = 'sidebar';
  const activeColor = 'rgb(85, 88, 250)';
  const disabledTextColor = 'rgba(0, 0, 0, 0.24)';
  const disabledIconColor = 'rgba(0, 0, 0, 0.16)';
  const itemIds = {
    mainArea: 'main-enterprise',
    footer: 'administration',
    defaultActive: 'main-advanced',
    disabled: 'main-svp',
    slide: 'main-mlspace',
    accordion1: 'main-data-catalog',
    accordionSecondLevelChild1: 'file-manager',
    accordionThirdLevelChild1: 'third-level-long-element',
    accordion2: 'environments',
    accordionSecondLevelChild2: 'jupiter-servers',
    withLabel: 'marketplace-ai-services',
    withLockedIcon: 'special-for-you',
    withCounter: 'common-platform-services',
    foundBySearch: 'datahub',
  };
  const firstLevelTexts = [
    'Главная',
    'Advanced',
    'Enterprise',
    'ML Space',
    'SVP',
    'Общие сервисы платформ',
    'Специально для вас',
    'Маркетплейс AI Services',
    'Администрирование',
    'Поддержка',
    'Настройки',
  ];
  const secondLevelTexts = [
    'ML Space',
    'Data Catalog',
    'Environments',
    'Deployments',
    'Artifact Registry',
    'AutoML',
    'Pipelines',
    'AI Marketplaces',
    'One more item',
    'Администрирование',
    'Поддержка',
    'Настройки',
  ];
  const filteredTexts = ['Data Catalog', 'Data Transfer Service', 'Dataset Registry', 'Datahub'];

  function visit(story: string) {
    return cy.visitComponent({
      category: 'not-stable',
      group: 'navigation',
      name: 'sidebar',
      story,
      props: {
        active: itemIds.defaultActive,
        'data-test-id': sidebarTestId,
      },
    });
  }

  function getSidebar() {
    return cy.getByDataTestId(sidebarTestId);
  }

  function getSidebarLevel() {
    return cy.getByDataTestId('sidebar__level');
  }

  function getItems() {
    return cy.get('[data-test-id^="sidebar__item-"]');
  }

  function getItemById(id: string) {
    return cy.getByDataTestId(`sidebar__item-${id}`);
  }

  function getItemPostfixLabel() {
    return cy.getByDataTestId('sidebar__item__postfix__label');
  }

  function getItemPostfixCounter() {
    return cy.getByDataTestId('sidebar__item__postfix__counter');
  }

  function getItemPostfixLockedIcon() {
    return cy.getByDataTestId('sidebar__item__postfix__locked-icon');
  }

  function getItemPostfixAccordionButton() {
    return cy.getByDataTestId('sidebar__item__postfix__accordion-button');
  }

  function getItemText() {
    return cy.getByDataTestId('sidebar__item__label');
  }

  function getItemIcon() {
    return cy.getByDataTestId('sidebar__item__icon');
  }

  function getBackButton() {
    return cy.getByDataTestId('sidebar__header__back-button');
  }

  function getOpenSearchButton() {
    return cy.getByDataTestId('sidebar__header__open-search-button');
  }

  function getCloseSearchButton() {
    return cy.getByDataTestId('sidebar__header__close-search-button');
  }

  function getSearch() {
    return cy.getByDataTestId('sidebar__header__search').find('input');
  }

  function getCollapseButton() {
    return cy.getByDataTestId('sidebar__footer__collapse-button');
  }

  function getUncollapseButton() {
    return cy.getByDataTestId('sidebar__footer__uncollapse-button');
  }

  function getHoverMenu() {
    return cy.getByDataTestId('sidebar__hover-menu');
  }

  function getHoverMenuItemById(id: string) {
    return cy.getByDataTestId(`sidebar__hover-menu-item-${id}`);
  }

  function getHoverMenuItemText() {
    return cy.getByDataTestId('sidebar__hover-menu-item__text');
  }

  function openHoverMenu(id: string) {
    getItemById(id).parent().trigger('mousemove');
  }

  function closeHoverMenu(id: string) {
    getItemById(id).parent().trigger('mouseleave');
  }

  function expectItemToBeActive(id: string, isCollapsed = false) {
    if (!isCollapsed) {
      getItemById(id).should('have.attr', 'data-active');
    }

    getItemById(id).within(() => {
      getItemIcon().find('svg').should('have.css', 'fill', activeColor);

      if (isCollapsed) {
        getItemIcon().should('have.attr', 'data-active');
      } else {
        getItemText().should('have.css', 'color', activeColor);
      }
    });
  }

  function expectItemToBeDisabled(id: string, isCollapsed = false) {
    getItemById(id).should('have.attr', 'data-disabled');

    getItemById(id).within(() => {
      getItemIcon().find('svg').should('have.css', 'fill', disabledIconColor);

      if (isCollapsed) {
        getItemIcon().should('have.attr', 'data-disabled');
      } else {
        getItemText().should('have.css', 'color', disabledTextColor);
      }
    });
  }

  function expectToHaveItemTexts(texts: string[]) {
    getItemText()
      .filter(':visible')
      .should('have.length', texts.length)
      .each((item, index) => {
        cy.wrap(item).should('have.text', texts[index]);
      });
  }

  function basics(isCollapsed: boolean) {
    it('selects item in the main area', () => {
      getItemById(itemIds.mainArea).click();

      expectItemToBeActive(itemIds.mainArea, isCollapsed);
    });

    it('selects item in the footer', () => {
      getItemById(itemIds.footer).click();

      expectItemToBeActive(itemIds.footer, isCollapsed);
    });

    it('does not select disabled item', () => {
      getItemById(itemIds.disabled).click();

      expectItemToBeActive(itemIds.defaultActive, isCollapsed);
    });

    it('navigates between levels', () => {
      getItemById(itemIds.slide).click();

      getSidebarLevel().within(() => {
        expectItemToBeActive(itemIds.slide, isCollapsed);
      });

      if (isCollapsed) {
        getHoverMenu().should('not.exist');
        getItems().filter(':visible').should('have.length', secondLevelTexts.length);
      } else {
        expectToHaveItemTexts(secondLevelTexts);
      }

      getBackButton().click();

      if (isCollapsed) {
        getItems().filter(':visible').should('have.length', firstLevelTexts.length);
      } else {
        expectToHaveItemTexts(firstLevelTexts);
      }
    });
  }

  describe('full version', () => {
    beforeEach(() => {
      visit('sidebar');
    });

    it('renders', () => {
      expectToHaveItemTexts(firstLevelTexts);
      expectItemToBeActive(itemIds.defaultActive);
      expectItemToBeDisabled(itemIds.disabled);

      getItemById(itemIds.withLabel).within(() => getItemPostfixLabel().should('be.visible'));
      getItemById(itemIds.withLockedIcon).within(() => getItemPostfixLockedIcon().should('be.visible'));
      getItemById(itemIds.withCounter).within(() => getItemPostfixCounter().should('have.text', '3'));
      getItemById(itemIds.mainArea).within(() => getItemPostfixCounter().should('have.text', '5'));

      getCollapseButton().should('be.visible');
    });

    basics(false);

    it('selects items in the accordion', () => {
      getItemById(itemIds.slide).click();
      getItemById(itemIds.accordion1)
        .click()
        .within(() => getItemPostfixAccordionButton().should('have.attr', 'data-opened', 'true'));

      getItemById(itemIds.accordionSecondLevelChild1).click();
      expectItemToBeActive(itemIds.accordionSecondLevelChild1);

      getItemById(itemIds.accordion2).click();
      getItemById(itemIds.accordionSecondLevelChild2).click();
      getItemById(itemIds.accordion1).within(() =>
        getItemPostfixAccordionButton().should('not.have.attr', 'data-opened'),
      );
    });

    it('searches the items', () => {
      const searchString = 'da';
      getItemById(itemIds.slide).click();
      getOpenSearchButton().click();
      getSearch().focus().type(searchString);

      expectToHaveItemTexts(filteredTexts);

      getCloseSearchButton().click();

      expectToHaveItemTexts(secondLevelTexts);

      getOpenSearchButton().click();
      getSearch().focus().type(searchString);
      getItemById(itemIds.foundBySearch).click();

      expectItemToBeActive(itemIds.foundBySearch);
    });

    it('collapse/uncollapse sidebar', () => {
      getCollapseButton().click();

      getSidebar().should('have.attr', 'data-collapsed');
      getSidebar().should('have.css', 'max-width', SIDEBAR_COLLAPSED_WIDTH);
      getItems().should('have.attr', 'data-collapsed');
      getItems().should('have.length', firstLevelTexts.length);
      getItemText().should('not.exist');

      getUncollapseButton().click();
      getSidebar().should('not.have.attr', 'data-collapsed');
      getSidebar().should('have.css', 'max-width', SIDEBAR_FULL_WIDTH);
      getItems().should('not.have.attr', 'data-collapsed');
      expectToHaveItemTexts(firstLevelTexts);
    });
  });

  describe('collapsed version', () => {
    beforeEach(() => {
      visit('sidebar');
      getCollapseButton().click();
    });

    it('renders', () => {
      getItems().should('have.length', 11);

      expectItemToBeActive(itemIds.defaultActive, true);
      expectItemToBeDisabled(itemIds.disabled, true);

      getItemText().should('not.exist');
      getItemById(itemIds.withLabel).within(() => getItemPostfixLabel().should('not.exist'));
      getItemById(itemIds.withLockedIcon).within(() => getItemPostfixLockedIcon().should('not.exist'));
      getItemById(itemIds.withCounter).within(() => getItemPostfixCounter().should('not.exist'));
      getItemById(itemIds.mainArea).within(() => getItemPostfixCounter().should('not.exist'));

      getUncollapseButton().should('be.visible');
    });

    basics(true);
  });

  describe('hover menu', () => {
    beforeEach(() => {
      visit('sidebar');
      getCollapseButton().click();
    });

    it('renders', () => {
      const verifyItem = (id: string, innerChecker: () => void) => {
        openHoverMenu(id);
        getHoverMenuItemById(id).within(innerChecker);
        closeHoverMenu(id);
        getHoverMenu().should('not.exist');
      };

      verifyItem(itemIds.defaultActive, () => getHoverMenuItemText().should('have.css', 'color', activeColor));
      verifyItem(itemIds.withLabel, () => getItemPostfixLabel().should('be.visible'));
      verifyItem(itemIds.withLockedIcon, () => getItemPostfixLockedIcon().should('be.visible'));
      verifyItem(itemIds.withCounter, () => getItemPostfixCounter().should('have.text', '3'));
      verifyItem(itemIds.mainArea, () => getItemPostfixCounter().should('have.text', '5'));
    });

    it('selects item on the top level', () => {
      openHoverMenu(itemIds.mainArea);
      getHoverMenuItemById(itemIds.mainArea).click();

      getHoverMenu().should('not.exist');
      expectItemToBeActive(itemIds.mainArea, true);
    });

    it('navigates to the inner level', () => {
      openHoverMenu(itemIds.slide);
      getHoverMenuItemById(itemIds.slide).click();

      getHoverMenu().should('not.exist');
      expectItemToBeActive(itemIds.slide, true);
    });

    it("doesn't select disabled item", () => {
      openHoverMenu(itemIds.disabled);

      getHoverMenu().should('not.exist');
    });

    it('selects item in the accordion', () => {
      openHoverMenu(itemIds.slide);
      getHoverMenuItemById(itemIds.slide).click();
      openHoverMenu(itemIds.accordion1);
      getHoverMenuItemById(itemIds.accordionThirdLevelChild1).click();

      getHoverMenu().should('not.exist');
      expectItemToBeActive(itemIds.accordion1, true);
      openHoverMenu(itemIds.accordion1);
      getHoverMenuItemById(itemIds.accordionThirdLevelChild1).within(() =>
        getHoverMenuItemText().should('have.css', 'color', activeColor),
      );

      getUncollapseButton().click();
      expectItemToBeActive(itemIds.accordionThirdLevelChild1);
    });
  });
});

export {};
