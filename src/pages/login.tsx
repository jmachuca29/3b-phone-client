import { Box, Button, Container, Paper, TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { login } from "src/services/auth";

type Login = {
  username: string;
  password: string;
};

const LoginPage = () => {
  const navigate = useNavigate();
  
  const mutationLogin = useMutation({
    mutationFn: login,
    onSuccess: async (response) => {
      const token = response.data.access_token || '';
      if (token !== '') {
        localStorage.setItem('3b-iphone-token', token);
        navigate('/')
      }
    },
  });

  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<Login>();

  const onSubmit: SubmitHandler<Login> = (data) => {
    console.log(data);
    mutationLogin.mutate(data);
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid xs={12}>
          <form onSubmit={handleSubmit(onSubmit)}>
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
                <TextField
                  id="user"
                  label="user"
                  variant="outlined"
                  {...register("username", { required: true })}
                />
                <TextField
                  id="password"
                  label="password"
                  variant="outlined"
                  type="password"
                  {...register("password", { required: true })}
                />
              </Box>
              <Button variant="contained" type="submit">
                Login
              </Button>
            </Paper>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;
