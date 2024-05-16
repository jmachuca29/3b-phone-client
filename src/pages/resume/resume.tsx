import {
  Avatar,
  Box,
  CardHeader,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getSalebyUID } from "src/services/sale";
import Grid from "@mui/material/Unstable_Grid2";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ProductPriceDetailContainer, ProductPriceDetailDescription, ProductPriceDetailPrice, ProductPriceDetailStack } from "./style";

const ResumePage = () => {
  const { uuid } = useParams();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["saleDetail", uuid],
    queryFn: () =>
      uuid ? getSalebyUID(uuid) : Promise.reject("No uuid found"),
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  console.log(data);

  return (
    <Container maxWidth="lg">
      <Stack>Orden: {uuid}</Stack>
      <Grid container spacing={2}>
        <Grid xs={8}>
          <Stack>
            <Paper>
              <CardHeader
                title="Details"
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
              />
              <Stack>
                <Stack>
                  <Avatar variant="rounded">
                    <p>Product</p>
                  </Avatar>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="Single-line item"
                        secondary="Secondary text"
                      />
                    </ListItem>
                  </List>
                  <Box>x1</Box>
                  <Box>$83.74</Box>
                </Stack>
                <ProductPriceDetailContainer>
                  <ProductPriceDetailStack>
                    <ProductPriceDetailDescription>Sub Total</ProductPriceDetailDescription>
                    <ProductPriceDetailPrice>30$</ProductPriceDetailPrice>
                  </ProductPriceDetailStack>
                  <Stack>
                    <Box>Shipping</Box>
                    <Box>30$</Box>
                  </Stack>
                </ProductPriceDetailContainer>
              </Stack>
            </Paper>
          </Stack>
        </Grid>
        <Grid xs={4}>
          <Paper>
            <CardHeader
              title="Customer Info"
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <Stack>
              <Avatar>H</Avatar>
              <Stack>
                <Typography variant="subtitle2" gutterBottom>
                  Lucian Obrien
                </Typography>
                <Box>ashlynn_ohara62@gmail.com</Box>
              </Stack>
            </Stack>
            <Divider />
            <CardHeader
              title="Delivery"
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <Stack>
              <Stack>
                <Box>Ship by</Box>
                <Box>DHL</Box>
              </Stack>
              <Stack>
                <Box>Tracking No.</Box>
                <Box>SPX037739199373</Box>
              </Stack>
            </Stack>
            <Divider />
            <CardHeader
              title="Shipping"
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <Stack>
              <Stack>
                <Box>Address</Box>
                <Box>19034 Verna Unions Apt. 164 - Honolulu, RI / 87535</Box>
              </Stack>
              <Stack>
                <Box>Phone number</Box>
                <Box>SPX037739199373</Box>
              </Stack>
            </Stack>
            <Divider />
            <CardHeader
              title="Payment"
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <Stack>
              <Stack>
                <Box>Method</Box>
                <Box>Yape</Box>
              </Stack>
              <Stack>
                <Box>Phone number</Box>
                <Box>SPX037739199373</Box>
              </Stack>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ResumePage;
