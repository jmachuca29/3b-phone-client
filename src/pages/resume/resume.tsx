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
import { useNavigate, useParams } from "react-router-dom";
import { getSalebyUID } from "src/services/sale";
import Grid from "@mui/material/Unstable_Grid2";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  CustomerInfoAvatarContainer,
  CustomerInfoContainer,
  CustomerInfoDescriptionContainer,
  CustomerPaymentContainer,
  CustomerPaymentSubCategoryContainer,
  CustomerPaymentSubCategoryName,
  CustomerShippingContainer,
  CustomerShippingSubCategoryContainer,
  CustomerShippingSubCategoryName,
  OrderDetailBody,
  OrderDetailContainer,
  OrderDetailDate,
  OrderDetailDescription,
  OrderDetailStack,
  ProductDetailContainer,
  ProductDetailDescriptionAvatar,
  ProductDetailDescriptionContainer,
  ProductDetailDescriptionListItem,
  ProductDetailDescriptionPrice,
  ProductDetailDescriptionQuantity,
  ProductPriceDetailContainer,
  ProductPriceDetailDescription,
  ProductPriceDetailPrice,
  ProductPriceDetailStack,
  ProductPriceDetailTotalDescription,
  ProductPriceDetailTotalPrice,
  ProductPriceDetailTotalStack,
} from "./style";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { MuiPaper } from "src/components/MuiPaper/MuiPaper";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localizedFormat from "dayjs/plugin/localizedFormat";
import Status from "src/components/Status/Status";
import { SaleState } from "src/constant/sales";
import Iconify from "src/components/Iconify/Iconify";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);

const stringAvatar = (name: string) => {
  return {
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
};

const calculateDate = (date: Date): string => {
  const time = dayjs(date);
  const peruTime = time.tz("America/Lima").format("DD MMMM YYYY hh:mm A");
  return peruTime;
};

const ResumePage = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();

  const [sale, setSale] = useState<any>(null);
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["saleDetail", uuid],
    queryFn: () =>
      uuid ? getSalebyUID(uuid) : Promise.reject("No uuid found"),
  });

  useEffect(() => {
    if (data) {
      const response = data?.data || null;
      setSale(response);
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
          <IconButton aria-label="arrow-back" onClick={() => navigate(-1)}>
            <ChevronLeftIcon />
          </IconButton>
          <OrderDetailBody>
            <OrderDetailDescription>
              <Typography variant="h4">
                Sales #{sale?.correlative || 0}
              </Typography>
              <Status state={sale?.status || SaleState.Pending} />
            </OrderDetailDescription>
            <OrderDetailDate variant="body2">
              {calculateDate(sale?.createdAt || new Date())}
            </OrderDetailDate>
          </OrderDetailBody>
        </OrderDetailStack>
      </OrderDetailContainer>
      <Grid container spacing={2}>
        <Grid xs={12} sm={8}>
          <Stack>
            <MuiPaper>
              <CardHeader
                title="Detalle"
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
              />
              <ProductDetailContainer>
                <ProductDetailDescriptionContainer>
                  <ProductDetailDescriptionAvatar variant="rounded">
                    <Iconify icon="ic:baseline-apple" />
                  </ProductDetailDescriptionAvatar>
                  <ProductDetailDescriptionListItem>
                    <ListItemText
                      primary={sale?.productName}
                      secondary={sale?.capacity?.description }
                    />
                  </ProductDetailDescriptionListItem>
                  <ProductDetailDescriptionQuantity>
                    x1
                  </ProductDetailDescriptionQuantity>
                  <ProductDetailDescriptionPrice>
                    S/ {sale?.price}
                  </ProductDetailDescriptionPrice>
                </ProductDetailDescriptionContainer>
                <ProductPriceDetailContainer>
                  <ProductPriceDetailStack>
                    <ProductPriceDetailDescription>
                      Sub Total
                    </ProductPriceDetailDescription>
                    <ProductPriceDetailPrice>
                      S/ {sale?.price}
                    </ProductPriceDetailPrice>
                  </ProductPriceDetailStack>
                  <ProductPriceDetailStack>
                    <ProductPriceDetailDescription>
                      Delivery
                    </ProductPriceDetailDescription>
                    <ProductPriceDetailPrice>-</ProductPriceDetailPrice>
                  </ProductPriceDetailStack>
                  <ProductPriceDetailTotalStack>
                    <ProductPriceDetailTotalDescription>
                      Total
                    </ProductPriceDetailTotalDescription>
                    <ProductPriceDetailTotalPrice>
                      S/ {sale?.price}
                    </ProductPriceDetailTotalPrice>
                  </ProductPriceDetailTotalStack>
                </ProductPriceDetailContainer>
              </ProductDetailContainer>
            </MuiPaper>
          </Stack>
        </Grid>
        <Grid xs={12} sm={4}>
          <MuiPaper>
            <CardHeader
              title="Datos Usuario"
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <CustomerInfoContainer>
              <CustomerInfoAvatarContainer
                {...stringAvatar(
                  `${
                    sale?.user?.name.toUpperCase() +
                    " " +
                    sale?.user?.lastName.toUpperCase()
                  }`
                )}
              ></CustomerInfoAvatarContainer>
              <CustomerInfoDescriptionContainer>
                <Typography variant="subtitle2" gutterBottom>
                  {sale?.user?.name} {sale?.user?.last_name}
                </Typography>
                <Box>{sale?.user?.email}</Box>
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
            <CustomerShippingContainer>
              <CustomerShippingSubCategoryContainer>
                <CustomerShippingSubCategoryName>
                  Departamento
                </CustomerShippingSubCategoryName>
                {sale?.user?.department}
              </CustomerShippingSubCategoryContainer>
              <CustomerShippingSubCategoryContainer>
                <CustomerShippingSubCategoryName>
                  Provincia
                </CustomerShippingSubCategoryName>
                {sale?.user?.province}
              </CustomerShippingSubCategoryContainer>
              <CustomerShippingSubCategoryContainer>
                <CustomerShippingSubCategoryName>
                  Distrito
                </CustomerShippingSubCategoryName>
                {sale?.user?.district}
              </CustomerShippingSubCategoryContainer>
              <CustomerShippingSubCategoryContainer>
                <CustomerShippingSubCategoryName>
                  Direccion
                </CustomerShippingSubCategoryName>
                {sale?.user?.address}
              </CustomerShippingSubCategoryContainer>
              <CustomerShippingSubCategoryContainer>
                <CustomerShippingSubCategoryName>
                  Celular
                </CustomerShippingSubCategoryName>
                {sale?.user?.phoneNumber}
              </CustomerShippingSubCategoryContainer>
            </CustomerShippingContainer>
            <Divider />
            <CardHeader
              title="Datos de Pago"
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <CustomerPaymentContainer>
              <CustomerPaymentSubCategoryContainer>
                <CustomerPaymentSubCategoryName>
                  Bank
                </CustomerPaymentSubCategoryName>
                {sale?.bankEntity}
              </CustomerPaymentSubCategoryContainer>
              <CustomerPaymentSubCategoryContainer>
                <CustomerPaymentSubCategoryName>
                  {["BCP", "INTERBANK"].includes(sale?.bankEntity)
                    ? "# Cuenta"
                    : "Celular"}
                </CustomerPaymentSubCategoryName>
                {sale?.numberAccount}
              </CustomerPaymentSubCategoryContainer>
            </CustomerPaymentContainer>
          </MuiPaper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ResumePage;
