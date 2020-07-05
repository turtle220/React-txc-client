import styled from 'styled-components'

export const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 18px;
`

export const SignedContainer = styled.div`
  text-align: center;
  margin-top: 170px;
`

export const StyledIframe = styled.iframe`
  width: 100%;
  height: ${({ hide }) => hide ? 0 : '60vh'};
  border: 0;
`

export const IframeLoading = styled.div`
  text-align: center;
  padding: 30px 0;

  & > p {
    margin-top: 20px;
  }
`
