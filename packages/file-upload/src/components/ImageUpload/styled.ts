import { styled } from '@linaria/react';

import { EXPORT_VARS } from '@sbercloud/uikit-product-theme';

export const ImageUploadWrap = styled.div`
  display: flex;
`;

export const FileUploadWrap = styled.div`
  display: flex;
  align-items: center;
`;

export const ImagePreview = styled.div<{ url: string | null }>`
  width: 80px;
  height: 80px;
  min-width: 80px;
  min-height: 80px;
  border-radius: 12px;
  margin-right: 16px;
  background-image: ${props => `url(${props.url})`};
  background-color: var(${EXPORT_VARS.BLACK_ALFA[8]});
  background-size: cover;
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
`;

export const Info = styled.div`
  font-size: 14px;
  line-height: 20px;
  color: var(${EXPORT_VARS.GREY[350]});

  &[data-error] {
    color: var(${EXPORT_VARS.BERRY_RED[100]});
  }
`;

export const FileNameWrap = styled.div`
  display: flex;
  min-width: 0;
  margin-left: 16px;
  font-size: 14px;
  line-height: 20px;
  color: var(${EXPORT_VARS.GREY[800]});
`;

export const FileName = styled.span`
  min-width: 40px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const FileExt = styled.span`
  flex-shrink: 0;
`;
