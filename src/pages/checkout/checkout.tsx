import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  Link,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { SaleCreateProps, SalesCreateDto, UserProps } from "src/models/sales";
import { getProductPrice } from "src/services/product";
import { createSale } from "src/services/sale";
import useAppStore from "src/store/store";
import { OrderDetailBody, OrderDetailContainer, OrderDetailDescription, OrderDetailStack } from "./styles";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LaunchIcon from '@mui/icons-material/Launch';
import useUbigeo from "src/hooks/ubigeo";

type Inputs = {
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  department: string;
  province: string;
  district: string;
  address: string;
  bankEntity: string;
  numberAccount: string;
};

const defaultFormValue: Inputs = {
  name: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  department: "",
  province: "",
  district: "",
  address: "",
  bankEntity: "",
  numberAccount: ""
};

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [survey, currentProduct] = useAppStore((state) => [
    state.survey,
    state.currentProduct,
  ]);
  const [checkoutForm] = useState(defaultFormValue);
  // const [ubigeos, setUbigeos] = useState<any>([]);
  const [price, setPrice] = useState(0);
  const [checked, setChecked] = useState(false)

  const {
    isPending,
    error,
    departments,
    provinces,
    districts,
    getProvincesByDepartamento,
    getDistricts,
  } = useUbigeo();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };


  const createSaleMutation = useMutation({
    mutationFn: createSale,
    onSuccess: ({ data }) => {
      const uuid = data?.uuid || ''
      navigate(`/resume/${uuid}`)
    },
  })

  const getPrice = async () => {
    try {
      const productId = currentProduct._id
      const gradeId = survey.condition._id
      const { data } = await getProductPrice(productId, gradeId)
      setPrice(data)
    } catch (error) {
      setPrice(0)
    }
  }

  useEffect(() => {
    getPrice()
  }, [])

  const {
    register,
    handleSubmit,
    setValue,
    control,
    // formState: { errors },
    watch
  } = useForm<Inputs>({
    defaultValues: {
      name: checkoutForm.name,
      lastName: checkoutForm.lastName,
      email: checkoutForm.email,
      phoneNumber: checkoutForm.phoneNumber,
      department: checkoutForm.department,
      province: checkoutForm.province,
      district: checkoutForm.district,
      address: checkoutForm.address,
      bankEntity: checkoutForm.bankEntity,
      numberAccount: checkoutForm.numberAccount
    },
  });

  const watchDepartment = watch("department");
  const watchProvinces = watch("province");

  useEffect(() => {
    getProvincesByDepartamento(watchDepartment);
  }, [watchDepartment]);

  useEffect(() => {
    getDistricts(watchDepartment, watchProvinces);
  }, [watchProvinces]);

  useEffect(() => {
    if (
      departments.length > 0 &&
      departments.some(
        (d: any) => d.departamento_inei === checkoutForm.department
      )
    ) {
      setValue("name", checkoutForm.name);
      setValue("lastName", checkoutForm.lastName);
      setValue("email", checkoutForm.email);
      setValue("phoneNumber", checkoutForm.phoneNumber);
      setValue("department", checkoutForm.department);
      setValue("address", checkoutForm.address);
      setValue("bankEntity", checkoutForm.bankEntity);
      setValue("numberAccount", checkoutForm.numberAccount);
    }
  }, [setValue, checkoutForm, departments]);

  useEffect(() => {
    if (
      provinces.length > 0 &&
      provinces.some((p: any) => p.provincia_inei === checkoutForm.province)
    ) {
      setValue("province", checkoutForm.province);
    }
  }, [setValue, checkoutForm.province, provinces]);

  useEffect(() => {
    if (
      districts.length > 0 &&
      districts.some((d: any) => d.distrito === checkoutForm.district)
    ) {
      setValue("district", checkoutForm.district);
    }
  }, [setValue, checkoutForm.district, districts]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const user: UserProps = {
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      department: data.department,
      province: data.province,
      district: data.district,
      address: data.address,
    };
    const createSale: SaleCreateProps = {
      productId: currentProduct._id,
      productName: currentProduct.description,
      capacity: survey.capacity._id,
      accesories: survey.accesories,
      serieNumber: survey.serieNumber,
      firstImei: survey.imei1,
      secondImei: survey.imei2,
      paymentType: survey.paymentType._id,
      grade: survey.condition._id,
      user: { ...user },
      bankEntity: data.bankEntity,
      numberAccount: data.numberAccount,
    };
    const createSaleDto = new SalesCreateDto(createSale);
    createSaleMutation.mutate(createSaleDto);
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
          <IconButton aria-label="arrow-back">
            <ChevronLeftIcon />
          </IconButton>
          <OrderDetailBody>
            <OrderDetailDescription>
              <Typography variant="h4">Checkout</Typography>
            </OrderDetailDescription>
          </OrderDetailBody>
        </OrderDetailStack>
      </OrderDetailContainer>
      <Grid container spacing={4}>
        <Grid xs={4}>
          <Card sx={{ display: "flex", flexDirection: "column" }}>
            <CardMedia
              component="img"
              image="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=242&h=242&fit=crop&auto=format"
              alt="Live from space album cover"
            />
            <Divider />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography component="div" variant="h5">
                  {currentProduct.description}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  Grado {survey.condition.description} - {survey.capacity.description} - {survey.paymentType.description}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  {price + '$'}
                </Typography>
              </CardContent>
            </Box>
          </Card>
        </Grid>
        <Grid xs={8}>
          <Paper sx={{ padding: 2 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: 2
                }}
              >
                <TextField
                  id="name"
                  label="Name"
                  variant="outlined"
                  {...register("name")}
                />
                <TextField
                  id="lastName"
                  label="Last Name"
                  variant="outlined"
                  {...register("lastName")}
                />
                <TextField
                  id="email"
                  label="email"
                  variant="outlined"
                  {...register("email")}
                />
                <TextField
                  id="phoneNumber"
                  label="phoneNumber"
                  variant="outlined"
                  {...register("phoneNumber")}
                />
                <Controller
                  name="department"
                  control={control}
                  render={({ field }) => (
                    <FormControl>
                      <InputLabel id="demo-simple-select-label">
                        Department
                      </InputLabel>
                      <Select {...field}>
                        {departments.map((d: any, index: number) => (
                          <MenuItem
                            key={index}
                            value={d?.departamento}
                          >
                            {d.departamento}
                          </MenuItem>
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
                      <InputLabel id="demo-simple-select-label">
                        Province
                      </InputLabel>
                      <Select {...field}>
                        {provinces?.map((p: any, index: number) => (
                          <MenuItem key={index} value={p?.provincia}>
                            {p.provincia}
                          </MenuItem>
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
                      <InputLabel id="demo-simple-select-label">
                        District
                      </InputLabel>
                      <Select {...field}>
                        {districts?.map((d: any, index: number) => (
                          <MenuItem key={index} value={d?.distrito}>
                            {d.distrito}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
                <TextField
                  id="address"
                  label="address"
                  variant="outlined"
                  {...register("address")}
                />
                <Controller
                  name="bankEntity"
                  control={control}
                  render={({ field }) => (
                    <FormControl>
                      <InputLabel id="demo-simple-select-label">
                        Entidad Bancaria
                      </InputLabel>
                      <Select {...field}>
                        <MenuItem value="BCP">
                          BCP
                        </MenuItem>
                        <MenuItem value="INTERBANK">
                          INTERBANK
                        </MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
                <TextField
                  id="numberAccount"
                  label="Numero de cuenta"
                  variant="outlined"
                  {...register("numberAccount")}
                />
              </Box>
              <Box>
                <FormControlLabel control={<Checkbox checked={checked} onChange={handleChange} />} label={
                  <p>
                    Acepto terminos y condiciones
                    <Link
                      href="https://grintek.pe/terminos_condiciones/"
                      target="_blank"
                    >
                      <LaunchIcon />
                    </Link>
                  </p>
                } />
              </Box>
              <Stack sx={{ textAlign: "end", display: "block", marginTop: 2 }}>
                <Button variant="contained" type="submit" disabled={!checked}>
                  Confirmar
                </Button>
              </Stack>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CheckoutPage;
