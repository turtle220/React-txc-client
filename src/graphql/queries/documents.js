import { gql } from 'apollo-boost'

export const S3_URL_QUERY = gql`
  query signedUrl ($path: String, $fileName: String!, $fileType: String!) {
    singedUrl(path: $path, fileName: $fileName, fileType: $fileType) {
      signedUrl
      viewUrl
    }
  }
`

export const S3_DOWNLOAD_URL_QUERY = gql`
  query s3DownloadUrl ($path: String!, $fileNameKey: String!, $fileNameDisplay: String!) {
    s3DownloadUrl(path: $path, fileNameKey: $fileNameKey, fileNameDisplay: $fileNameDisplay)
  }
`
