import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {listProducts} from "src/services/product";
import { useEffect, useState } from "react";
import useAppStore from "src/store/store";
import { useForm } from "react-hook-form";
import mobileImg from './../assets/mobile_image.svg';
import Iconify from "src/components/Iconify/Iconify";

interface IFormInputs {
  searchField: string
}

const searchProducts = (products: any, searchTerm: any) => {
  // Create a RegExp object from the search term, case insensitive
  const regex = new RegExp(searchTerm, 'i');

  // Filter products based on description and capacity description
  return products.filter((product: any) => {
      // Check if the product's description matches the regex
      const matchesDescription = regex.test(product.description);
      // Check if the product's capacity description matches the regex
      const matchesCapacityDescription = regex.test(product.capacity.description);

      // Return true if any of the descriptions match
      return matchesDescription || matchesCapacityDescription;
  });
}

const AppPage = () => {
  const navigate = useNavigate();
  const [products, setFn] = useAppStore((state) => [state.products, state.setFn]);
  // const [originalProducts, setOriginalProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const { isPending, error, data } = useQuery({
    queryKey: ["listProducts"],
    queryFn: listProducts,
  });

  const {
    register,
    watch,
  } = useForm<IFormInputs>()

  const watchSearchField = watch("searchField")

  useEffect(() => {
    const productsFound = searchProducts(products, watchSearchField)
    setProductsFiltered(productsFound)
  }, [watchSearchField]);

  useEffect(() => {
    if(data) {
      setFn.setProducts(data?.data);
    }  
  }, [data]);

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid xs={12}>
            <Typography variant="h3" gutterBottom>
              Busca un modelo
            </Typography>
          </Grid>
          <Grid xs={12}>
            <TextField
              fullWidth
              label="Buscar un modelo..."
              id="outlined-start-adornment"
              autoComplete="off"
              {...register("searchField")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <Iconify icon="material-symbols:search" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid container xs={12}>
            {productsFiltered.map((product: any, index: any) => {
              return (
                <Grid xs={12} sm={4} key={index}>
                  <Card>
                    <CardActionArea onClick={() => {
                      setFn.setCurrentProduct(product)
                      navigate("/trade-in")
                    }}>
                      <CardMedia
                        component="img"
                        // height="140"
                        image={product?.image?.url || mobileImg}
                        alt="green iguana"
                        sx={{
                          height: '20rem',
                          objectFit: 'contain',
                        }}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          { product.description } - { product.capacity.description }
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AppPage;
