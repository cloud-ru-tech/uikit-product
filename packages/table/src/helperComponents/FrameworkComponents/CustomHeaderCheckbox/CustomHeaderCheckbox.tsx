import { FC, useCallback, useEffect, useState } from 'react';

import { getRenderedNodes } from '../../../helpers/getRenderedNodes';
import { TableBasicTypes } from '../../../helpers/types';
import * as S from './styled';

export const CustomHeaderCheckbox: FC<TableBasicTypes.ICellRendererParams> = props => {
  const [hasSelected, setHasSelected] = useState(false);
  const [value, setValue] = useState(false);

  const { api: gridApi } = props;

  const [disabled, setDisabled] = useState<boolean | undefined>();

  useEffect(() => {
    const nextDisabled = !getRenderedNodes(gridApi)?.length;
    if (disabled !== nextDisabled) {
      setDisabled(nextDisabled);
    }

    const onComponentStateChanged = (): void => {
      const nextDisabled = !getRenderedNodes(gridApi)?.length;
      if (disabled !== nextDisabled) {
        setDisabled(nextDisabled);
      }
    };
    gridApi?.addEventListener('componentStateChanged', onComponentStateChanged);

    const onModelUpdated = (): void => {
      const nextDisabled = !getRenderedNodes(gridApi)?.length;
      if (disabled !== nextDisabled) {
        setDisabled(nextDisabled);
      }
    };
    gridApi?.addEventListener('modelUpdated', onModelUpdated);

    const onViewportChanged = (): void => {
      if (hasSelected || value) gridApi?.deselectAll();
    };
    gridApi?.addEventListener('viewportChanged', onViewportChanged);

    const onPaginationChanged = (): void => {
      if (hasSelected || value) gridApi?.deselectAll();
    };
    gridApi?.addEventListener('paginationChanged', onPaginationChanged);

    const onRowSelected = (): void => {
      const renderedNodes = getRenderedNodes(gridApi)?.length;
      const selectedNodes = gridApi?.getSelectedNodes().length;
      const isEqual = renderedNodes === selectedNodes;

      const nextHasSelected = !isEqual && selectedNodes > 0;
      if (nextHasSelected !== hasSelected) setHasSelected(nextHasSelected);

      const nextValue = isEqual && selectedNodes > 0;
      if (nextValue !== value) setValue(nextValue);
    };
    gridApi?.addEventListener('rowSelected', onRowSelected);

    return () => {
      gridApi?.removeEventListener('componentStateChanged', onComponentStateChanged);
      gridApi?.removeEventListener('modelUpdated', onModelUpdated);
      gridApi?.removeEventListener('viewportChanged', onViewportChanged);
      gridApi?.removeEventListener('paginationChanged', onPaginationChanged);
      gridApi?.removeEventListener('rowSelected', onRowSelected);
    };
  }, [gridApi, hasSelected, value, disabled]);

  const onChange = useCallback(
    checked => {
      getRenderedNodes(gridApi)?.map(row => row.setSelected(checked));
      setValue(checked);
    },
    [gridApi, value],
  );

  return <S.Checkbox disabled={disabled} partChecked={hasSelected} checked={value} handleChange={onChange} />;
};
