import { GridApi } from '@ag-grid-community/core';
import { utils as xlsxUtils, writeFileXLSX } from 'xlsx';

import { csvToArray } from './csvToArray';
import { parseCellsToStringOrNumber } from './parseCellsToStringOrNumber';

export function exportDataAsExcel({
  gridApi,
  fileName,
  columnKeys,
}: {
  columnKeys: string[];
  gridApi: GridApi;
  fileName: string;
}) {
  const csvString = gridApi.getDataAsCsv({ columnKeys }) ?? '';
  const data = parseCellsToStringOrNumber(csvToArray(csvString));

  const workbook = xlsxUtils.book_new();
  const worksheet = xlsxUtils.aoa_to_sheet(data);
  xlsxUtils.book_append_sheet(workbook, worksheet);
  writeFileXLSX(workbook, `${fileName}.xlsx`);
}
