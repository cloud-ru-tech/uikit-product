import { FC } from 'react';

import { BucketInterfaceSVG, FileInterfaceSVG, FolderInterfaceSVG } from '@sbercloud/uikit-react-icons';

import { TableBasicTypes } from '../../../helpers/types';
import * as S from './styled';

const containerTypes = {
  file: 'file',
  directory: 'directory',
  bucket: 'bucket',
};

const components = {
  [containerTypes.file]: <FileInterfaceSVG />,
  [containerTypes.directory]: <FolderInterfaceSVG />,
  [containerTypes.bucket]: <BucketInterfaceSVG />,
  default: <FileInterfaceSVG />,
};

export const StorageName: FC<TableBasicTypes.ICellRendererParams> = ({ value, data }) => (
  <S.Container>
    {components[data.type] ? components[data.type] : components.default}
    <S.ValueContainer>{value}</S.ValueContainer>
  </S.Container>
);
