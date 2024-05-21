import styled from "@emotion/styled";
import { Avatar, Stack } from "@mui/material";

const ProductDetailContainer = styled(Stack)`
  padding-left: 24px;
  padding-right: 24px;
`

const ProductDetailDescriptionContainer = styled(Stack)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 24px;
  padding-bottom: 24px;
  min-width: 640px;
  border-bottom: 2px dashed rgb(244, 246, 248);
`
const ProductDetailDescriptionAvatar = styled(Avatar)`
  margin-right: 16px;
`

const ProductDetailDescriptionListItem = styled(Stack)`
  flex: 1 1 auto;
  min-width: 0px;
  margin: 0px;
`

const ProductDetailDescriptionQuantity = styled(Stack)`
  line-height: 1.57143;
  font-size: 0.875rem;
  font-family: "Public Sans", sans-serif;
  font-weight: 400;
`

const ProductDetailDescriptionPrice = styled(Stack)`
  width: 110px;
  text-align: right;
  font-weight: 600;
  line-height: 1.57143;
  font-size: 0.875rem;
  font-family: "Public Sans", sans-serif;
`

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
  ProductDetailContainer,
  ProductDetailDescriptionContainer,
  ProductDetailDescriptionAvatar,
  ProductDetailDescriptionListItem,
  ProductDetailDescriptionQuantity,
  ProductDetailDescriptionPrice,
  ProductPriceDetailContainer,
  ProductPriceDetailStack,
  ProductPriceDetailDescription,
  ProductPriceDetailPrice,
};
