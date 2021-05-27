import { FC, useMemo, useState } from 'react';

import { GroupDisabledCell } from '../../helperComponents/FrameworkComponents';
import { TableBasicTypes } from '../../helpers/types';
import { radioStyle } from '../../styles/tableWithRowDetail';
import { Table } from '../Default';

const TableRadioColumnDefine: TableBasicTypes.ColDef = {
  cellRenderer: 'agGroupCellRenderer',
  cellRendererParams: { innerRenderer: 'GroupDisabledCell' },
};

export interface ITableWithRowDetailProps {
  rowData: TableBasicTypes.GridOptions['rowData'];
  columnDefs: TableBasicTypes.GridOptions['columnDefs'];
  onGridReady?: TableBasicTypes.GridOptions['onGridReady'];
  frameworkComponents?: TableBasicTypes.GridOptions['frameworkComponents'];
  onSelectionChanged?(selectedRows?: TableBasicTypes.GridOptions['rowData']): void;
}

export const TableWithRowDetail: FC<ITableWithRowDetailProps> = props => {
  const { rowData, columnDefs, onSelectionChanged, onGridReady, frameworkComponents } = props;
  const [gridApi, setGridApi] = useState<TableBasicTypes.GridApi>();

  const handlerGridReady = (params: TableBasicTypes.GridReadyEvent): void => {
    setGridApi(params.api);
    onGridReady?.(params);
  };

  const handlerSelectionChanged = () => {
    const selectedRows = gridApi?.getSelectedRows();
    onSelectionChanged?.(selectedRows);
  };

  const handlerRowClicked = (event: TableBasicTypes.RowClickedEvent): void => {
    const target = event?.event?.target as HTMLDivElement;
    if (target?.id === 'more-button' || event.data.disabled) {
      return;
    }
    if (event.node.detail) {
      return;
    }
    if (!event.node.expanded) {
      gridApi?.forEachNode(node => {
        if (node.expanded) {
          node.setExpanded(false);
        }
      });
    }

    const nextOpenState = !event.node.expanded;
    event.node.setExpanded(nextOpenState);
    event.node.setSelected(nextOpenState);
  };

  const handlerGroupOpened = (event: TableBasicTypes.RowGroupOpenedEvent): void => {
    if (event.node.expanded) {
      gridApi?.forEachNode(node => {
        if (node.expanded && node.id !== event.node.id) {
          node.setExpanded(false);
        }
      });
    }

    const nextOpenState = event.node.expanded;
    event.node.setExpanded(nextOpenState);
    event.node.setSelected(nextOpenState);
  };

  const colDefs = useMemo(() => {
    if (!columnDefs) {
      return undefined;
    }

    const newColDef = [...columnDefs];
    newColDef[0] = { ...newColDef[0], ...TableRadioColumnDefine };
    return newColDef;
  }, [columnDefs]);

  return (
    <Table
      rowData={rowData}
      columnDefs={colDefs}
      classNameContainer={radioStyle}
      onGridReady={handlerGridReady}
      onRowClicked={handlerRowClicked}
      gridOptions={{
        defaultColDef: {
          suppressMenu: true,
        },
        pagination: true,
        paginationPageSize: 5,
        suppressPaginationPanel: true,
        rowSelection: 'single',
      }}
      frameworkComponents={{
        GroupDisabledCell,
        ...(frameworkComponents || {}),
      }}
      onSelectionChanged={handlerSelectionChanged}
      masterDetail
      detailRowAutoHeight
      isRowMaster={dataItem => !dataItem.disabled}
      icons={{
        groupExpanded: '<i class="custom-radio-unchecked"/>',
        groupContracted: '<i class="custom-radio-checked"/>',
      }}
      onRowGroupOpened={handlerGroupOpened}
      getRowClass={({ data: { disabled } }: TableBasicTypes.RowClassParams) => (disabled ? 'ag-row-disabled' : '')}
      detailCellRendererFramework={() => props.children}
    />
  );
};
