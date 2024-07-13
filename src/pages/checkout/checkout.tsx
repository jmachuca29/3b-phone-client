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
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { SaleCreateProps, SalesCreateDto, UserProps } from "src/models/sales";
import { getProductPrice } from "src/services/product";
import { createSale } from "src/services/sale";
import useAppStore from "src/store/store";
import {
  OrderDetailBody,
  OrderDetailContainer,
  OrderDetailDescription,
  OrderDetailStack,
} from "./styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LaunchIcon from "@mui/icons-material/Launch";
import useUbigeo from "src/hooks/ubigeo";
import getDocumentType from "src/services/type-document";

const documentValidator: any = {
  'DNI': {
    minLength: 8,
    maxLength: 8,
    maxLengthErrorMessage: "Maximo 8 digitos"
  },
  'PASAPORTE': {
    minLength: 15,
    maxLength: 15,
    maxLengthErrorMessage: "Maximo 15 digitos"
  }
}

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
  documentType: string;
  documentNumber: string;
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
  numberAccount: "",
  documentType: "",
  documentNumber: "",
};

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [survey, currentProduct, user] = useAppStore((state) => [
    state.survey,
    state.currentProduct,
    state.user,
  ]);
  const [price, setPrice] = useState(0);
  const [checked, setChecked] = useState(false);
  const [documentTypeName, setDocumentTypeName] = useState('')

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

  const { data: typeDocumentData } = useQuery({
    queryKey: ['typeDocument'],
    queryFn: getDocumentType,
  })

  const createSaleMutation = useMutation({
    mutationFn: createSale,
    onSuccess: ({ data }) => {
      const uuid = data?.uuid || "";
      navigate(`/resume/${uuid}`);
    },
  });

  const getPrice = async () => {
    try {
      const productId = currentProduct._id;
      const gradeId = survey.condition._id;
      const { data } = await getProductPrice(productId, gradeId);
      setPrice(data);
    } catch (error) {
      setPrice(0);
    }
  };

  useEffect(() => {
    if (Object.keys(currentProduct).length === 0) {
      return navigate("/")
    }
    getPrice();
  }, []);

  const { register, handleSubmit, setValue, control, watch, formState: { errors } } = useForm<Inputs>({
    defaultValues: defaultFormValue,
  });

  const watchDepartment = watch("department");
  const watchProvince = watch("province");
  const watchBankEntity = watch("bankEntity");
  const watchDocumentType = watch("documentType");

  useEffect(() => {
    console.log('typeDocumentData', typeDocumentData)
    const documentTypes = typeDocumentData?.data || [];
    const documentTypeName = documentTypes.find(doc => doc._id === watchDocumentType)?.description || ''
    setDocumentTypeName(documentTypeName)
  }, [typeDocumentData, watchDocumentType]);

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
    setValue("name", user?.name);
    setValue("lastName", user?.lastName);
    setValue("email", user?.email);
  }, [user]);

  console.log(errors)

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    
    const userProps: UserProps = {
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
      userId: user.id,
      productId: currentProduct._id,
      productName: currentProduct.description,
      capacity: survey.capacity._id,
      accesories: survey.accesories,
      serieNumber: survey.serieNumber,
      firstImei: survey.imei1,
      secondImei: survey.imei2,
      paymentType: survey.paymentType._id,
      grade: survey.condition._id,
      user: { ...userProps },
      bankEntity: data.bankEntity,
      numberAccount: data.numberAccount,
      documentType: data.documentType,
      documentNumber: data.documentNumber
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
          <IconButton aria-label="arrow-back" onClick={() => navigate(-1)}>
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
        <Grid xs={12} sm={4}>
          <Card sx={{ display: "flex", flexDirection: "column" }}>
            <CardMedia
              component="img"
              image={currentProduct?.image?.url}
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
                  Grado {survey.condition.description} -{" "}
                  {survey.capacity.description} -{" "}
                  {survey.paymentType.description}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  {"S/. " + price}
                </Typography>
              </CardContent>
            </Box>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Paper sx={{ padding: 2 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box
                display="grid"
                gridTemplateColumns={{
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                }}
                gap={2}
              >
                <TextField
                  id="name"
                  label="Nombre"
                  variant="outlined"
                  {...register("name")}
                />
                <TextField
                  id="lastName"
                  label="Apellidos"
                  variant="outlined"
                  {...register("lastName")}
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
                        {typeDocumentData?.data?.map(
                          (type: any, index: number) => (
                            <MenuItem key={index} value={type._id}>
                              {type.description}
                            </MenuItem>
                          )
                        )}
                      </Select>
                    </FormControl>
                  )}
                />
                <Controller
                  name="documentNumber"
                  control={control}
                  rules={{ maxLength: documentValidator[documentTypeName]?.maxLength }}
                  render={({ field }) => (
                    <TextField
                      label="Numero Documento"
                      variant="outlined"
                      error={!!errors.documentNumber}
                      helperText={errors.documentNumber && documentValidator[documentTypeName].maxLengthErrorMessage }
                      {...field}
                    />
                  )}
                />
                <TextField
                  id="email"
                  label="Correo"
                  variant="outlined"
                  {...register("email")}
                />
                <TextField
                  id="phoneNumber"
                  label="Numero de telefono"
                  variant="outlined"
                  {...register("phoneNumber")}
                />
                <Controller
                  name="department"
                  control={control}
                  render={({ field }) => (
                    <FormControl>
                      <InputLabel id="demo-simple-select-label">
                        Departamento
                      </InputLabel>
                      <Select {...field}>
                        {departments.map((d: any, index: number) => (
                          <MenuItem key={index} value={d}>
                            {d}
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
                        Provincia
                      </InputLabel>
                      <Select {...field}>
                        {provinces?.map((p: any, index: number) => (
                          <MenuItem key={index} value={p}>
                            {p}
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
                        Distrito
                      </InputLabel>
                      <Select {...field}>
                        {districts?.map((d: any, index: number) => (
                          <MenuItem key={index} value={d}>
                            {d}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
                <TextField
                  id="address"
                  label="Direccion"
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
                        <MenuItem value="BCP">BCP</MenuItem>
                        <MenuItem value="INTERBANK">INTERBANK</MenuItem>
                        <MenuItem value="YAPE">YAPE</MenuItem>
                        <MenuItem value="PLIN">PLIN</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
                <TextField
                  id="numberAccount"
                  label={
                    ["BCP", "INTERBANK"].includes(watchBankEntity)
                      ? "Numero de Cuenta"
                      : "Celular"
                  }
                  variant="outlined"
                  {...register("numberAccount")}
                />
              </Box>
              <Box>
                <FormControlLabel
                  control={
                    <Checkbox checked={checked} onChange={handleChange} />
                  }
                  label={
                    <p>
                      Acepto terminos y condiciones
                      <Link
                        href="https://grintek.pe/terminos_condiciones/"
                        target="_blank"
                      >
                        <LaunchIcon />
                      </Link>
                    </p>
                  }
                />
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
