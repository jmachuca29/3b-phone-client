import styled from "@emotion/styled"
import { Stack } from "@mui/material"

const OrderDetailContainer = styled(Stack)`
  margin: 40px 0px;
  flex-direction: row;
`

const OrderDetailStack = styled(Stack)`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
`

const OrderDetailBody = styled(Stack)`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const OrderDetailDescription = styled(Stack)`
  display: flex;
  flex-direction: row;
  gap: 8px;
  -webkit-box-align: center;
  align-items: center;
`

export {
    OrderDetailContainer,
    OrderDetailStack,
    OrderDetailBody,
    OrderDetailDescription
}