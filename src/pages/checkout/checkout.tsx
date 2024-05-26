import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
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
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CreateSaleDTO, ICreateSale, IUser } from "src/models/sales";
import { getProductPrice } from "src/services/product";
import { createSale } from "src/services/sale";
import { getUbigeo } from "src/services/ubigeo";
import useAppStore from "src/store/store";
import { OrderDetailBody, OrderDetailContainer, OrderDetailDescription, OrderDetailStack } from "./styles";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

type DepartmentInfo = {
  name: string;
  departamento_inei: string;
};

type Inputs = {
  name: string;
  lastName: string;
  email: string;
  cellphone: string;
  department: string;
  provinces: string;
  district: string;
  address: string;
};

const defaultFormValue: Inputs = {
  name: "",
  lastName: "",
  email: "",
  cellphone: "",
  department: "",
  provinces: "",
  district: "",
  address: "",
};

function getUniqueDepartments(ubigeos: any): DepartmentInfo[] {
  const uniqueDepartments: DepartmentInfo[] = [];
  const seenDepartments = new Map<string, string>();

  for (const ubigeo of ubigeos) {
    if (!seenDepartments.has(ubigeo.departamento)) {
      seenDepartments.set(ubigeo.departamento, ubigeo.departamento_inei);
      uniqueDepartments.push({
        name: ubigeo.departamento,
        departamento_inei: ubigeo.departamento_inei,
      });
    }
  }

  return uniqueDepartments;
}

const getUniqueProvinces = (ubigeosProvince: any): DepartmentInfo[] => {
  const uniqueDepartments: any[] = [];
  const seenDepartments = new Map<string, string>();

  for (const ubigeo of ubigeosProvince) {
    if (!seenDepartments.has(ubigeo.provincia)) {
      seenDepartments.set(ubigeo.provincia, ubigeo.provincia_inei);
      uniqueDepartments.push({
        name: ubigeo.provincia,
        provincia_inei: ubigeo.provincia_inei,
      });
    }
  }

  return uniqueDepartments;
};

const getDistricts = (
  ubigeos: any,
  departamento_inei: any,
  provincia_inei: any
): any[] => {
  //TO DO
  const districts = ubigeos.filter(
    (ubigeo: any) =>
      ubigeo.departamento_inei === departamento_inei &&
      ubigeo.provincia_inei === provincia_inei
  );
  return districts || [];
};

const getProvincesByDepartamento = (
  ubigeos: any,
  departamento_inei: string
) => {
  const ubigeosProvince = ubigeos.filter(
    (ubigeo: any) => ubigeo.departamento_inei === departamento_inei
  );
  const provinces = getUniqueProvinces(ubigeosProvince);
  return provinces || [];
};

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [survey, currentProduct] = useAppStore((state) => [
    state.survey,
    state.currentProduct,
  ]);
  const [checkoutForm] = useState(defaultFormValue);
  const [ubigeos, setUbigeos] = useState<any>([]);
  const [departments, setDepartments] = useState<any>([]);
  const [provinces, setProvinces] = useState<any>([]);
  const [districts, setDistricts] = useState<any>([]);
  const [price, setPrice] = useState(0);

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

  const { isPending, error, data } = useQuery({
    queryKey: ["ubigeo"],
    queryFn: getUbigeo,
  });

  useEffect(() => {
    getPrice()
  }, [])


  useEffect(() => {
    if (data) {
      const ubigeos = data.data;
      setUbigeos(ubigeos);
      const departments = getUniqueDepartments(ubigeos);
      setDepartments(departments);
    }
  }, [data]);

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    control,
    // formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      name: checkoutForm.name,
      lastName: checkoutForm.lastName,
      email: checkoutForm.email,
      cellphone: checkoutForm.cellphone,
      department: checkoutForm.department,
      provinces: checkoutForm.provinces,
      district: checkoutForm.district,
      address: checkoutForm.address,
    },
  });

  const watchDepartment = watch("department");
  const watchProvinces = watch("provinces");

  useEffect(() => {
    setValue("provinces", "");
    setValue("district", "");
    if (watchDepartment && ubigeos.length > 0) {
      const provinces = getProvincesByDepartamento(ubigeos, watchDepartment);
      setProvinces(provinces);
    }
  }, [watchDepartment, ubigeos, setValue]);

  useEffect(() => {
    if (watchProvinces) {
      const districts = getDistricts(ubigeos, watchDepartment, watchProvinces);
      setDistricts(districts);
    }
  }, [ubigeos, watchDepartment, watchProvinces, setValue]);

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
      setValue("cellphone", checkoutForm.cellphone);
      setValue("department", checkoutForm.department);
      setValue("address", checkoutForm.address);
    }
  }, [setValue, checkoutForm, departments]);

  useEffect(() => {
    if (
      provinces.length > 0 &&
      provinces.some((p: any) => p.provincia_inei === checkoutForm.provinces)
    ) {
      setValue("provinces", checkoutForm.provinces);
    }
  }, [setValue, checkoutForm.provinces, provinces]);

  useEffect(() => {
    if (
      districts.length > 0 &&
      districts.some((d: any) => d.distrito === checkoutForm.district)
    ) {
      setValue("district", checkoutForm.district);
    }
  }, [setValue, checkoutForm.district, districts]);

  const findByUbigeoId = (data: any) => {
    const ubigeoId = ubigeos.find(
      (u: any) =>
        u.departamento_inei === data.department &&
        u.provincia_inei === data.provinces &&
        u.distrito === data.district
    );
    return ubigeoId.id_ubigeo || ''
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const user: IUser = {
      name: data.name,
      last_name: data.lastName,
      email: data.email,
      cellphone: data.cellphone,
      ubigeo: findByUbigeoId(data),
      address: data.address,
    };
    const createSale: ICreateSale = {
      product: currentProduct._id,
      capacity: survey.capacity._id,
      accesories: survey.accesories,
      serieNumber: survey.serieNumber,
      imei_1: survey.imei1,
      imei_2: survey.imei2,
      paymentType: survey.paymentType._id,
      grade: survey.condition._id,
      user: { ...user },
    };
    const createSaleDto = new CreateSaleDTO(createSale);
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
              // sx={{ width: 151 }}
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
                  id="cellphone"
                  label="cellphone"
                  variant="outlined"
                  {...register("cellphone")}
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
                        {departments.map((department: any, index: number) => (
                          <MenuItem
                            key={index}
                            value={department.departamento_inei}
                          >
                            {department.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
                <Controller
                  name="provinces"
                  control={control}
                  render={({ field }) => (
                    <FormControl>
                      <InputLabel id="demo-simple-select-label">
                        Province
                      </InputLabel>
                      <Select {...field}>
                        {provinces?.map((province: any, index: number) => (
                          <MenuItem key={index} value={province.provincia_inei}>
                            {province.name}
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
                        {districts?.map((district: any, index: number) => (
                          <MenuItem key={index} value={district.distrito}>
                            {district.distrito}
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
              </Box>
              <Stack sx={{ textAlign: "end", display: "block", marginTop: 2 }}>
                <Button variant="contained" type="submit">
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
