import { Box, Button, Container, Paper, TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

type Login = {
    user: string
}

const LoginPage = () => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid xs={12}>
          <Paper>
            <Box
              sx={{
                mb: 2,
                display: "grid",
                gridTemplateColumns: "repeat(1, 1fr)",
                gap: 2,
                padding: 3,
              }}
            >
              <TextField id="user" label="user" variant="outlined" />
              <TextField id="password" label="password" variant="outlined" />
            </Box>
            <Button variant="contained" type="submit">
              Login
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;
