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
import { Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import listProducts from "src/services/product";
import { useEffect, useState } from "react";
import useAppStore from "src/store/store";

const AppPage = () => {
  const navigate = useNavigate();
  const [setFn] = useAppStore((state) => [state.setFn]);
  const [products, setProducts] = useState([]);
  const { isPending, error, data } = useQuery({
    queryKey: ["listProducts"],
    queryFn: listProducts,
  });

  useEffect(() => {
    data && setProducts(data?.data);
  }, [data]);

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid xs={12}>
            <Typography variant="h3" gutterBottom>
              h3. Heading
            </Typography>
          </Grid>
          <Grid xs={12}>
            <TextField
              fullWidth
              label="Buscar un modelo..."
              id="outlined-start-adornment"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                    >
                      <Visibility />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid container xs={12}>
            {products.map((product: any, index: any) => {
              return (
                <Grid xs={4} key={index}>
                  <Card>
                    <CardActionArea onClick={() => {
                      setFn.setProduct(product)
                      navigate("/trade-in")
                    }}>
                      <CardMedia
                        component="img"
                        height="140"
                        image="/static/images/cards/contemplative-reptile.jpg"
                        alt="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          { product.description }
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Lizards are a widespread group of squamate reptiles,
                          with over 6,000 species, ranging across all continents
                          except Antarctica
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
