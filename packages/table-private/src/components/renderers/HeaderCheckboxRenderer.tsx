import { Events, GridApi } from '@ag-grid-community/core';
import { useEffect, useState } from 'react';

import { Checkbox } from '@sbercloud/uikit-product-checkbox';

import * as S from './styled';

export function HeaderCheckboxRenderer({ api, itemCount }: { api: GridApi; itemCount: number }) {
  const [allSelected, setIsAllSelected] = useState(api.getSelectedRows().length === itemCount);
  const [isEmpty, setIsEmpty] = useState(api.getSelectedRows().length === 0);

  useEffect(() => {
    const handler = () => {
      setIsAllSelected(api.getSelectedRows().length === itemCount);
      setIsEmpty(api.getSelectedRows().length === 0);
    };

    api.addEventListener(Events.EVENT_SELECTION_CHANGED, handler);
    api.addEventListener(Events.EVENT_FILTER_CHANGED, handler);
    api.addEventListener(Events.EVENT_ROW_DATA_UPDATED, handler);

    return () => {
      api.removeEventListener(Events.EVENT_SELECTION_CHANGED, handler);
      api.removeEventListener(Events.EVENT_FILTER_CHANGED, handler);
      api.removeEventListener(Events.EVENT_ROW_DATA_UPDATED, handler);
    };
  }, [api, itemCount]);

  return (
    <S.RadioCell>
      <Checkbox
        disabled={itemCount === 0}
        checked={!isEmpty && allSelected}
        partChecked={!isEmpty && !allSelected}
        handleChange={() => {
          if (allSelected) {
            api.deselectAllFiltered();
          } else {
            api.selectAllFiltered();
          }
        }}
      />
    </S.RadioCell>
  );
}
