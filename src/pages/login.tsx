import {
  Alert,
  Box,
  Button,
  Container,
  Link,
  Paper,
  Snackbar,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { login } from "src/services/auth";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";

type Login = {
  username: string;
  password: string;
};

enum SeverityType {
  success = "success",
  info = "info",
  warning = "warning",
  error = "error",
}

const LoginPage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState({
    message: "",
    type: SeverityType.error,
  });

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const mutationLogin = useMutation({
    mutationFn: login,
    onSuccess: async (response) => {
      const token = response.data.access_token || "";
      if (token !== "") {
        localStorage.setItem("3b-iphone-token", token);
        setMessageInfo({ message: "Bienvenido", type: SeverityType.success });
        setOpen(true);
        navigate("/");
      }
    },
    onError: async (error: any) => {
      const response = error?.response;
      const message = response?.data?.message || "Internal Server Error";
      setMessageInfo({ message: message, type: SeverityType.error });
      setOpen(true);
    },
  });

  const { register, handleSubmit } = useForm<Login>();

  const onSubmit: SubmitHandler<Login> = (data) => {
    mutationLogin.mutate(data);
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid xs={12}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Paper
              sx={{
                mb: 2,
                padding: 3,
              }}
            >
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(1, 1fr)",
                  gap: 2,
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
              <Box sx={{ textAlign: "end" }}>
                <Link component={RouterLink} to="/register" variant="caption">
                  No tienes cuenta?, Registrate
                </Link>
              </Box>
              <Button variant="contained" type="submit">
                Login
              </Button>
            </Paper>
          </form>
        </Grid>
      </Grid>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={messageInfo.type as SeverityType}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {messageInfo.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default LoginPage;
