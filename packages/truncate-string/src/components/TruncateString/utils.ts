import { Tag, TextEntity } from '../../constants';

export const getTag = (textEntity: TextEntity) => {
  switch (textEntity) {
    case TextEntity.H1:
      return Tag.H1;
    case TextEntity.H2:
    case TextEntity.H2Semibold:
      return Tag.H2;
    case TextEntity.H3:
    case TextEntity.H3Semibold:
      return Tag.H3;
    case TextEntity.H4:
    case TextEntity.H4Semibold:
      return Tag.H4;
    case TextEntity.H5:
      return Tag.H5;
    default:
      return Tag.Span;
  }
};
