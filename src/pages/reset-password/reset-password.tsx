import {
    Box,
    Button,
    Container,
    IconButton,
    Link,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useMutation } from "@tanstack/react-query";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { login } from "src/services/auth";
import { Link as RouterLink } from "react-router-dom";
import { OrderDetailBody, OrderDetailContainer, OrderDetailDescription, OrderDetailStack } from "./styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useEffect } from "react";

const defaultFormValue: Inputs = {
    token: "",
    password: "",
    passwordRepeat: "",
};

type Inputs = {
    token: string;
    password: string;
    passwordRepeat: string;
};

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const { token } = useParams();
    const mutationLogin = useMutation({
        mutationFn: login,
        onSuccess: async (response) => { },
        onError: async (error: any) => { },
    });

    const { register, handleSubmit, setValue, control } = useForm<Inputs>({
        defaultValues: defaultFormValue,
    });

    useEffect(() => {
        setValue("token", token!);
    }, [token])


    const onSubmit: SubmitHandler<Login> = (data) => {
        console.log(data)
        // mutationLogin.mutate(data);
    };

    return (
        <Container maxWidth="lg">
            <OrderDetailContainer>
                <OrderDetailStack>
                    <IconButton aria-label="arrow-back" onClick={() => navigate(-1)}>
                        <ChevronLeftIcon />
                    </IconButton>
                    <OrderDetailBody>
                        <OrderDetailDescription>
                            <Typography variant="h4">Registrar</Typography>
                        </OrderDetailDescription>
                    </OrderDetailBody>
                </OrderDetailStack>
            </OrderDetailContainer>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid xs={12} sm={4}>
                        <Typography variant="h6">Contraseña</Typography>
                        <Typography variant="body2">Ingrese Nueva Contraseña..</Typography>
                    </Grid>
                    <Grid xs={12} sm={8}>
                        <Paper>
                            <Stack
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "24px",
                                    padding: "24px",
                                }}
                            >
                                <Controller
                                    name="password"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            label="Contraseña"
                                            variant="outlined"
                                            type="password"
                                            {...field}
                                        />
                                    )}
                                />
                                <Controller
                                    name="passwordRepeat"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            label="Repita Contraseña"
                                            variant="outlined"
                                            type="password"
                                            {...field}
                                        />
                                    )}
                                />
                            </Stack>
                        </Paper>
                    </Grid>
                    <Grid xs={4}></Grid>
                    <Grid xs={8} sx={{ textAlign: "end" }}>
                        <Button type="submit" variant="contained" size="large">
                            Aplicar Cambios
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    )
}

export default ResetPasswordPage
