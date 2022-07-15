import { NoDataProps } from '@sbercloud/uikit-product-no-data';

type VisitProps = Partial<Pick<NoDataProps, 'title' | 'description'>>;

function visit(name: string, testId: string, props?: VisitProps) {
  cy.visitComponent({
    name,
    group: 'no-data',
    props: {
      'data-test-id': testId,
      ...props,
    },
  });
}

describe('[NoData]:', () => {
  describe('NoData:', () => {
    const testId = 'no-data__test';
    const visitNoData = (props?: VisitProps) => visit('no-data', testId, props);

    it('Rendered', () => {
      visitNoData();

      expect(cy.getByDataTestId(testId)).to.exist;
    });

    it('title = `NoDataTitle`, title should be `NoDataTitle`', () => {
      const title = 'NoDataTitle';
      visitNoData({
        title,
      });

      cy.getByDataTestId(testId).within(() => cy.contains(title));
    });

    it('description = `NoDataDescription`, description should be `NoDataDescription`', () => {
      const description = 'NoDataDescription';
      visitNoData({
        description,
      });

      cy.getByDataTestId(testId).within(() => cy.contains(description));
    });
  });

  describe('NoDataSearch:', () => {
    const testId = 'no-data-search__test';
    const visitNoDataSearch = () => visit('no-data-search', testId);

    it('Rendered', () => {
      visitNoDataSearch();

      expect(cy.getByDataTestId(testId)).to.exist;
    });

    it('title and description should be displayed', () => {
      const title = 'Ничего не найдено';
      const description = 'Попробуйте изменить запрос';
      visitNoDataSearch();

      cy.getByDataTestId(testId).within(() => cy.contains(title));
      cy.getByDataTestId(testId).within(() => cy.contains(description));
    });
  });
});

export {};
