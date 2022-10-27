import { Events, GridApi } from '@ag-grid-community/core';
import { useEffect, useState } from 'react';

import { CheckboxIconPrivate } from '@sbercloud/uikit-product-checkbox';

import * as S from './styled';

export function HeaderCheckboxRenderer({ api, itemCount }: { api: GridApi; itemCount: number }) {
  const [allSelected, setIsAllSelected] = useState(
    api.getSelectedRows().length === itemCount && api.getSelectedRows().length !== 0,
  );
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
    <S.RadioCell
      onClick={() => {
        if (allSelected) {
          api.deselectAllFiltered();
        } else {
          api.selectAllFiltered();
        }
      }}
    >
      <CheckboxIconPrivate checked={allSelected} partChecked={!isEmpty && !allSelected} />
    </S.RadioCell>
  );
}
