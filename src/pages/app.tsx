import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const AppPage = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.data),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <Typography variant="h3" gutterBottom>
            h3. Heading
          </Typography>
        </Grid>
        <Grid xs={12}>
          <Item>xs=12</Item>
        </Grid>
        <Grid container xs={12}>
          {data.map(() => {
            return (
              <Grid xs={4}>
                <Item>xs=4</Item>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Box>
  );
};

export default AppPage;
