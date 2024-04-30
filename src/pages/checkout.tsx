import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { CreateSaleDTO, ICreateSale, IUser } from "src/models/sales";
import { getUbigeo } from "src/services/ubigeo";
import useAppStore from "src/store/store";

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
  const [survey, product] = useAppStore((state) => [
    state.survey,
    state.product,
  ]);
  const [checkoutForm] = useState(defaultFormValue);
  const [ubigeos, setUbigeos] = useState<any>([]);
  const [departments, setDepartments] = useState<any>([]);
  const [provinces, setProvinces] = useState<any>([]);
  const [districts, setDistricts] = useState<any>([]);

  const { isPending, error, data } = useQuery({
    queryKey: ["ubigeo"],
    queryFn: getUbigeo,
  });

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
    // console.log("onSubmit", data);
    const user: IUser = {
      name: data.name,
      last_name: data.lastName,
      email: data.email,
      cellphone: data.cellphone,
      ubigeo: findByUbigeoId(data),
      address: data.address,
    };
    const createSale: ICreateSale = {
      product: product._id,
      capacity: survey.capacity,
      accesories: survey.accesories,
      serieNumber: survey.serieNumber,
      imei_1: survey.imei1,
      imei_2: survey.imei2,
      paymentType: survey.paymentType,
      grade: survey.condition,
      user: { ...user },
    };
    const createSaleDto = new CreateSaleDTO(createSale);
    console.log(createSaleDto);
  };

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid xs={12}>
          <Paper>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box
                sx={{
                  mb: 2,
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: 2,
                  padding: 3,
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
              <Stack>
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
