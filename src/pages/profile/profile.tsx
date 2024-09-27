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
  import { useQuery } from "@tanstack/react-query";
  import { useEffect, useState } from "react";
  import { Controller, SubmitHandler, useForm } from "react-hook-form";
  import useAppStore from "src/store/store";
  import { useNavigate } from "react-router-dom";
  import { OrderDetailBody, OrderDetailContainer, OrderDetailDescription, OrderDetailStack } from "./styles";
  import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
  import useUbigeo from "src/hooks/ubigeo";
  import getDocumentType from "src/services/type-document";
import getUserById from "src/services/user";

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

  const ProfilePage = () => {
    const [user] = useAppStore(state => [state.user])
    const [profile, setProfile] = useState<any>(null);
    const navigate = useNavigate();

    const idUser = user.id
    const { data } = useQuery({
        queryKey: ["userDetail", idUser],
        queryFn: () =>
            idUser ? getUserById(idUser) : Promise.reject("No id found"),
      });

    const { data: typeDocumentData } = useQuery({
      queryKey: ['typeDocument'],
      queryFn: getDocumentType,
    })


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


    useEffect(() => {
        if (provinces.length > 0) {
            setValue('province', profile?.province);
        }
    }, [provinces]);

    useEffect(() => {
        if (districts.length > 0) {
            setValue('district', profile?.district);
        }
    }, [districts]);

    useEffect(() => {
        if (data && departments.length > 0) {
            const response = data?.data || null;
            setForm(response);
            setProfile(response);
        }
    }, [data, departments]);

    const setForm = (data: any) => {
        setValue('name', data?.name);
        setValue('lastName', data?.lastName);
        setValue('email', data?.email);
        setValue('cellphone', data?.cellphone);
        setValue('documentType', data?.documentType);
        setValue('documentNumber', data?.documentNumber);
        setValue('department', data?.department);
        setValue('province', data?.province);
        setValue('district', data?.district);
        setValue('address', data?.address);
    };


    const onSubmit: SubmitHandler<Inputs> = () => {
      return
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
                <Typography variant="h4">Mi Perfil</Typography>
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
                      render={({ field }) => <TextField label="Nombres" variant="outlined" {...field} disabled/>}
                    />
                    <Controller
                      name="lastName"
                      control={control}
                      render={({ field }) => <TextField label="Apellidos" variant="outlined" {...field} disabled/>}
                    />
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => <TextField label="Email" variant="outlined" {...field} disabled/>}
                    />
                    <Controller
                      name="cellphone"
                      control={control}
                      render={({ field }) => <TextField label="Celular" variant="outlined" {...field} disabled/>}
                    />
                    <Controller
                      name="documentType"
                      control={control}
                      render={({ field }) => (
                        <FormControl>
                          <InputLabel id="demo-simple-select-label">
                            Tipo Documento
                          </InputLabel>
                          <Select label="Tipo Documento" {...field} disabled>
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
                      render={({ field }) => <TextField label="Numero Documento" variant="outlined" {...field} disabled/>}
                    />
                  </Box>
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
              <Button type='submit' variant="contained" size='large' disabled>Actualizar</Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    )
  };

  export default ProfilePage;
