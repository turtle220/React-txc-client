import styled from 'styled-components'

import { color } from '@/utils/theme.utils'

const iconColor = color.includes('dark') ? '#fff' : '#333'

export const Bar = styled.ul`
  margin-top: -5px;
  list-style: none;
  display: flex;
  flex-direction: row;

  & > li {
    position: relative;
    display: flex;
    flex: 1;
    max-width:55px;
    padding: 3px 5px;
    justify-content: center;
    cursor: default;
    margin-right: 1px;
    color: #333;
  }
`

export const Icon = styled.div`
  position: absolute;
  top: -12px;
  display: block;
  width: 0; 
  height: 0; 
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid ${iconColor};
`
