import { FC } from 'react';

import { FileSVG, FolderSVG, BucketSVG } from '@sbercloud/icons';

import { TableBasicTypes } from 'components/Table/helpers/types';

import * as S from './styled';

const containerTypes = {
  file: 'file',
  directory: 'directory',
  bucket: 'bucket',
};

const components = {
  [containerTypes.file]: <FileSVG />,
  [containerTypes.directory]: <FolderSVG />,
  [containerTypes.bucket]: <BucketSVG />,
  default: <FileSVG />,
};

export const StorageName: FC<TableBasicTypes.ICellRendererParams> = ({
  value,
  data,
}) => (
  <S.Container>
    {components[data.type] ? components[data.type] : components.default}
    <S.ValueContainer>{value}</S.ValueContainer>
  </S.Container>
);
