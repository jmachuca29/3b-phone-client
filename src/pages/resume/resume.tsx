import {
  Box,
  CardHeader,
  Container,
  Divider,
  IconButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getSalebyUID } from "src/services/sale";
import Grid from "@mui/material/Unstable_Grid2";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CustomerDeliveryContainer, CustomerDeliverySubCategoryContainer, CustomerDeliverySubCategoryName, CustomerInfoAvatarContainer, CustomerInfoContainer, CustomerInfoDescriptionContainer, CustomerPaymentContainer, CustomerPaymentSubCategoryContainer, CustomerPaymentSubCategoryName, CustomerShippingContainer, CustomerShippingSubCategoryContainer, CustomerShippingSubCategoryName, OrderDetailBody, OrderDetailContainer, OrderDetailDate, OrderDetailDescription, OrderDetailStack, OrderDetailStatus, ProductDetailContainer, ProductDetailDescriptionAvatar, ProductDetailDescriptionContainer, ProductDetailDescriptionListItem, ProductDetailDescriptionPrice, ProductDetailDescriptionQuantity, ProductPriceDetailContainer, ProductPriceDetailDescription, ProductPriceDetailPrice, ProductPriceDetailStack, ProductPriceDetailTotalDescription, ProductPriceDetailTotalPrice, ProductPriceDetailTotalStack } from "./style";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { MuiPaper } from "src/components/MuiPaper/MuiPaper";
import { useEffect, useState } from "react";

const stringAvatar = (name: string) => {
  return {
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

const ResumePage = () => {
  const { uuid } = useParams();

  const [product, setProduct] = useState<any>(null)

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["saleDetail", uuid],
    queryFn: () =>
      uuid ? getSalebyUID(uuid) : Promise.reject("No uuid found"),
  });

  useEffect(() => {
    if(data) {
      const response = data?.data || null
      console.log(response)
      setProduct(response)
    }  
  }, [data]);

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <Container maxWidth="lg">
      <OrderDetailContainer>
        <OrderDetailStack>
          <IconButton aria-label="arrow-back">
            <ChevronLeftIcon />
          </IconButton>
          <OrderDetailBody>
            <OrderDetailDescription>
              <Typography variant="h4">Orden #{uuid}</Typography>
              <OrderDetailStatus>{product?.status}</OrderDetailStatus>
            </OrderDetailDescription>
            <OrderDetailDate variant="body2">20 May 2024 12:03 PM</OrderDetailDate>
          </OrderDetailBody>
        </OrderDetailStack>
      </OrderDetailContainer>
      <Grid container spacing={2}>
        <Grid xs={8}>
          <Stack>
            <MuiPaper>
              <CardHeader
                title="Details"
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
              />
              <ProductDetailContainer>
                <ProductDetailDescriptionContainer>
                  <ProductDetailDescriptionAvatar variant="rounded">
                    <p>Product</p>
                  </ProductDetailDescriptionAvatar>
                  <ProductDetailDescriptionListItem>
                    <ListItemText
                      primary="Single-line item"
                      secondary="Secondary text"
                    />
                  </ProductDetailDescriptionListItem>
                  <ProductDetailDescriptionQuantity>x1</ProductDetailDescriptionQuantity>
                  <ProductDetailDescriptionPrice>S/ {product?.price}</ProductDetailDescriptionPrice>
                </ProductDetailDescriptionContainer>
                <ProductPriceDetailContainer>
                  <ProductPriceDetailStack>
                    <ProductPriceDetailDescription>Sub Total</ProductPriceDetailDescription>
                    <ProductPriceDetailPrice>S/ {product?.price}</ProductPriceDetailPrice>
                  </ProductPriceDetailStack>
                  <ProductPriceDetailStack>
                    <ProductPriceDetailDescription>Shipping</ProductPriceDetailDescription>
                    <ProductPriceDetailPrice>-</ProductPriceDetailPrice>
                  </ProductPriceDetailStack>
                  <ProductPriceDetailTotalStack>
                    <ProductPriceDetailTotalDescription>Total</ProductPriceDetailTotalDescription>
                    <ProductPriceDetailTotalPrice>S/ {product?.price}</ProductPriceDetailTotalPrice>
                  </ProductPriceDetailTotalStack>
                </ProductPriceDetailContainer>
              </ProductDetailContainer>
            </MuiPaper>
          </Stack>
        </Grid>
        <Grid xs={4}>
          <MuiPaper>
            <CardHeader
              title="Customer Info"
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <CustomerInfoContainer>
              <CustomerInfoAvatarContainer {...stringAvatar(`${product?.user?.name.toUpperCase() + ' ' + product?.user?.last_name.toUpperCase() }`)}></CustomerInfoAvatarContainer>
              <CustomerInfoDescriptionContainer>
                <Typography variant="subtitle2" gutterBottom>
                  { product?.user?.name } { product?.user?.last_name }
                </Typography>
                <Box>{ product?.user?.email }</Box>
              </CustomerInfoDescriptionContainer>
            </CustomerInfoContainer>
            <Divider />
            <CardHeader
              title="Delivery"
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <CustomerDeliveryContainer>
              <CustomerDeliverySubCategoryContainer>
                <CustomerDeliverySubCategoryName>Ship by</CustomerDeliverySubCategoryName>
                -
              </CustomerDeliverySubCategoryContainer>
              <CustomerDeliverySubCategoryContainer>
                <CustomerDeliverySubCategoryName>Tracking No.</CustomerDeliverySubCategoryName>
                -
              </CustomerDeliverySubCategoryContainer>
            </CustomerDeliveryContainer>
            <Divider />
            <CardHeader
              title="Shipping"
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <CustomerShippingContainer>
              <CustomerShippingSubCategoryContainer>
                <CustomerShippingSubCategoryName>Address</CustomerShippingSubCategoryName>
                { product?.user?.address }
              </CustomerShippingSubCategoryContainer>
              <CustomerShippingSubCategoryContainer>
                <CustomerShippingSubCategoryName>Phone number</CustomerShippingSubCategoryName>
                { product?.user?.cellphone }
              </CustomerShippingSubCategoryContainer>
            </CustomerShippingContainer>
            <Divider />
            <CardHeader
              title="Payment"
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <CustomerPaymentContainer>
              <CustomerPaymentSubCategoryContainer>
                <CustomerPaymentSubCategoryName>Method</CustomerPaymentSubCategoryName>
                Yape
              </CustomerPaymentSubCategoryContainer>
              <CustomerPaymentSubCategoryContainer>
                <CustomerPaymentSubCategoryName>Phone number</CustomerPaymentSubCategoryName>
                { product?.user?.cellphone }
              </CustomerPaymentSubCategoryContainer>
            </CustomerPaymentContainer>
          </MuiPaper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ResumePage;
