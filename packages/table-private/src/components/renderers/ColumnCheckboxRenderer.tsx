import { Events, GridApi, RowNode } from '@ag-grid-community/core';
import { useEffect, useState } from 'react';

import { CheckboxIconPrivate } from '@sbercloud/uikit-product-checkbox';

import * as S from './styled';

type CellRendererProps = {
  rowIndex: number;
  api: GridApi;
  node: RowNode;
  data?: {
    disabled?: boolean;
  };
};

export function ColumnCheckboxRenderer({ api, node, data }: CellRendererProps) {
  const [isSelected, setIsSelected] = useState(node.isSelected());
  useEffect(() => {
    const handler = () => {
      setIsSelected(node.isSelected());
    };
    api.addEventListener(Events.EVENT_SELECTION_CHANGED, handler);

    return () => api.removeEventListener(Events.EVENT_SELECTION_CHANGED, handler);
  }, [api, node]);

  if (Boolean(node?.rowPinned)) return null;

  return (
    <S.RadioCell>
      <CheckboxIconPrivate checked={Boolean(isSelected)} disabled={Boolean(data?.disabled)} />
    </S.RadioCell>
  );
}
