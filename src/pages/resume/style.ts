import styled from "@emotion/styled";
import { Stack } from "@mui/material";

const ProductPriceDetailContainer = styled(Stack)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-end;
  margin-top: 3rem;
  margin-bottom: 3rem;
`;
const ProductPriceDetailStack = styled(Stack)`
  display: flex;
  flex-direction: row;
`;

const ProductPriceDetailDescription = styled(Stack)`
  color: rgb(99, 115, 129);
`;

const ProductPriceDetailPrice = styled(Stack)`
  width: 160px;
  font-weight: 600;
  line-height: 1.57143;
  font-size: 0.875rem;
`;

export {
  ProductPriceDetailContainer,
  ProductPriceDetailStack,
  ProductPriceDetailDescription,
  ProductPriceDetailPrice,
};
