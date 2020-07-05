const { REACT_APP_S3_BUCKET_ROOT_PATH } = process.env

export const S3_BUCKET_PATHS = {
  ROOT_PATH: REACT_APP_S3_BUCKET_ROOT_PATH,
  DOCUMENTS: {
    MEMBER: `${REACT_APP_S3_BUCKET_ROOT_PATH}/documents/member`,
    CLAIM: `${REACT_APP_S3_BUCKET_ROOT_PATH}/documents/claim`,
    TRADE: `${REACT_APP_S3_BUCKET_ROOT_PATH}/documents/trade`
  }
}
