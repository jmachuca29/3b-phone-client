import {
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import registerAccount from "src/services/account";
import useAppStore from "src/store/store";
import AlertType from "src/constant/alertType";
import { useNavigate } from "react-router-dom";
import { OrderDetailBody, OrderDetailContainer, OrderDetailDescription, OrderDetailStack } from "./styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import useUbigeo from "src/hooks/ubigeo";
import getDocumentType from "src/services/type-document";
import { UserAccountDto } from "src/models/user";

const defaultFormValue = {
  name: '',
  lastName: '',
  email: '',
  cellphone: '',
  documentType: '',
  documentNumber: '',
  department: '',
  province: '',
  district: '',
  address: '',
  password: '',
  passwordRepeat: ''
};

type Inputs = {
  name: string;
  lastName: string;
  email: string;
  cellphone: string;
  documentType: string;
  documentNumber: string;
  department: string;
  province: string;
  district: string;
  address: string;
  password: string;
  passwordRepeat: string;
}

const RegisterPage = () => {
  const [setFn] = useAppStore(state => [state.setFn])
  const navigate = useNavigate();

  const { data: typeDocumentData } = useQuery({
    queryKey: ['typeDocument'],
    queryFn: getDocumentType,
  })

  const mutationRegister = useMutation({
    mutationFn: registerAccount,
    onSuccess: async () => {
      setFn.addSnackbar("Registro Exitoso", AlertType.success)
      navigate('/')
    },
    onError: async (error: any) => {
      const response = error?.response;
      const message = response?.data?.message || "Internal Server Error";
      setFn.addSnackbar(message, AlertType.error)
    },
  });

  const {
    isPending,
    error,
    departments,
    provinces,
    districts,
    getProvincesByDepartamento,
    getDistricts,
  } = useUbigeo();

  const {
    handleSubmit,
    setValue,
    control,
    watch
  } = useForm<Inputs>({
    defaultValues: defaultFormValue,
  });

  const watchDepartment = watch("department");
  const watchProvince = watch("province");

  useEffect(() => {
    if (watchDepartment) {
      getProvincesByDepartamento(watchDepartment);
      setValue("province", "");
      setValue("district", "");
    }
  }, [watchDepartment]);

  useEffect(() => {
    if (watchProvince) {
      getDistricts(watchDepartment, watchProvince);
    }
  }, [watchProvince]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    const user = new UserAccountDto(data)
    console.log(user)
    mutationRegister.mutate(data);
  };

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (error) {
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
              <Typography variant="h4">Registar</Typography>
            </OrderDetailDescription>
          </OrderDetailBody>
        </OrderDetailStack>
      </OrderDetailContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid xs={4}>
            <Typography variant="h6">Usuario</Typography>
            <Typography variant="body2">Datos del Usuario...</Typography>
          </Grid>
          <Grid xs={8}>
            <Paper>
              <Stack sx={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
                <Box sx={{ display: 'grid', gap: '24px 16px', gridTemplateColumns: 'repeat(2, 1fr)' }}>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => <TextField label="Nombres" variant="outlined" {...field} />}
                  />
                  <Controller
                    name="lastName"
                    control={control}
                    render={({ field }) => <TextField label="Apellidos" variant="outlined" {...field} />}
                  />
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => <TextField label="Email" variant="outlined" {...field} />}
                  />
                  <Controller
                    name="cellphone"
                    control={control}
                    render={({ field }) => <TextField label="Celular" variant="outlined" {...field} />}
                  />
                  <Controller
                    name="documentType"
                    control={control}
                    render={({ field }) => (
                      <FormControl>
                        <InputLabel id="demo-simple-select-label">
                          Tipo Documento
                        </InputLabel>
                        <Select label="Tipo Documento" {...field}>
                          {typeDocumentData?.data?.map((type: any, index: number) => (
                            <MenuItem key={index} value={type._id}>
                              {type.description}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                  <Controller
                    name="documentNumber"
                    control={control}
                    render={({ field }) => <TextField label="Numero Documento" variant="outlined" {...field} />}
                  />
                </Box>
              </Stack>
            </Paper>
          </Grid>
          <Grid xs={4}>
            <Typography variant="h6">Contrasena</Typography>
            <Typography variant="body2">Ingrese contrasena..</Typography>
          </Grid>
          <Grid xs={8}>
            <Paper>
              <Stack sx={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => <TextField label="Contrasena" variant="outlined" type="password" {...field} />}
                />
                <Controller
                  name="passwordRepeat"
                  control={control}
                  render={({ field }) => <TextField label="Repita Contrasena" variant="outlined" type="password" {...field} />}
                />
              </Stack>
            </Paper>
          </Grid>
          <Grid xs={4}>
            <Typography variant="h6">Direccion</Typography>
            <Typography variant="body2">Datos de Direccion...</Typography>
          </Grid>
          <Grid xs={8}>
            <Paper>
              <Stack sx={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
                <Controller
                  name="department"
                  control={control}
                  render={({ field }) => (
                    <FormControl>
                      <InputLabel id="department-label">Department</InputLabel>
                      <Select
                        {...field}
                        labelId="department-label"
                        onChange={(e) => {
                          field.onChange(e);
                          setValue("province", "");
                          setValue("district", "");
                        }}
                      >
                        {departments.map((d, index) => (
                          <MenuItem key={index} value={d}>{d}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
                <Controller
                  name="province"
                  control={control}
                  render={({ field }) => (
                    <FormControl>
                      <InputLabel id="province-label">Province</InputLabel>
                      <Select
                        {...field}
                        labelId="province-label"
                        onChange={(e) => {
                          field.onChange(e);
                          setValue("district", "");
                        }}
                      >
                        {provinces.map((p, index) => (
                          <MenuItem key={index} value={p}>{p}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
                <Controller
                  name="district"
                  control={control}
                  render={({ field }) => (
                    <FormControl>
                      <InputLabel id="district-label">District</InputLabel>
                      <Select
                        {...field}
                        labelId="district-label"
                      >
                        {districts.map((d, index) => (
                          <MenuItem key={index} value={d}>{d}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => <TextField label="Direccion" variant="outlined" {...field} />}
                />
              </Stack>
            </Paper>
          </Grid>
          <Grid xs={4}></Grid>
          <Grid xs={8} sx={{ textAlign: 'end' }}>
            <Button type='submit' variant="contained" size='large'>Registrar</Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
};

export default RegisterPage;
