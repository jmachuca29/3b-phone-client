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
import { useEffect, useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import getDocumentType from "src/services/type-document";
import { getUbigeo } from "src/services/ubigeo";

const defaultFormValue = {
  name: "",
  lastName: "",
  typeDocument: "",
  numberDocument: "",
  email: "",
  cellphone: "",
  department: "",
  provinces: "",
  district: "",
  address: "",
  password: "",
  passwordRepeat: "",
};

type Inputs = {
  name: string;
  lastName: string;
  typeDocument: string;
  numberDocument: string;
  email: string;
  cellphone: string;
  department: string;
  provinces: string;
  district: string;
  address: string;
  password: string;
  passwordRepeat: string;
};

type DepartmentInfo = {
  name: string;
  departamento_inei: string;
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

const RegisterPage = () => {
  const [userForm] = useState(defaultFormValue);
  const [ubigeos, setUbigeos] = useState<any>([]);
  const [departments, setDepartments] = useState<any>([]);
  const [provinces, setProvinces] = useState<any>([]);
  const [districts, setDistricts] = useState<any>([]);
  const [typeDocuments, setTypeDocuments] = useState<any>([]);

  const { isPending, error, data } = useQuery({
    queryKey: ["ubigeo"],
    queryFn: getUbigeo,
  });

  const { data: documentData } = useQuery({
    queryKey: ["documentType"],
    queryFn: getDocumentType,
  });

  useEffect(() => {
    if (documentData) {
      const documentTypes = documentData.data;
      setTypeDocuments(documentTypes);
    }
  }, [documentData]);

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
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      name: userForm.name,
      lastName: userForm.lastName,
      typeDocument: userForm.typeDocument,
      numberDocument: userForm.numberDocument,
      email: userForm.email,
      cellphone: userForm.cellphone,
      department: userForm.department,
      provinces: userForm.provinces,
      district: userForm.district,
      address: userForm.address,
    },
  });

  const watchDepartment = watch("department");
  const watchProvinces = watch("provinces");
  const password = useRef({});
  password.current = watch("password", "");

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
      departments.some((d: any) => d.departamento_inei === userForm.department)
    ) {
      setValue("name", userForm.name);
      setValue("lastName", userForm.lastName);
      setValue("typeDocument", userForm.typeDocument);
      setValue("numberDocument", userForm.numberDocument);
      setValue("email", userForm.email);
      setValue("cellphone", userForm.cellphone);
      setValue("department", userForm.department);
      setValue("address", userForm.address);
    }
  }, [setValue, userForm, departments]);

  useEffect(() => {
    if (
      provinces.length > 0 &&
      provinces.some((p: any) => p.provincia_inei === userForm.provinces)
    ) {
      setValue("provinces", userForm.provinces);
    }
  }, [setValue, userForm.provinces, provinces]);

  useEffect(() => {
    if (
      districts.length > 0 &&
      districts.some((d: any) => d.distrito === userForm.district)
    ) {
      setValue("district", userForm.district);
    }
  }, [setValue, userForm.district, districts]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
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
                  {/* <TextField
                    id="typeDocument"
                    label="Type Document"
                    variant="outlined"
                    {...register("typeDocument")}
                  /> */}
                  <Controller
                    name="typeDocument"
                    control={control}
                    render={({ field }) => (
                      <FormControl>
                        <InputLabel id="demo-simple-select-label">
                          Tipo Documento
                        </InputLabel>
                        <Select {...field}>
                          {typeDocuments.map((typeDocument: any, index: number) => (
                            <MenuItem
                              key={index}
                              value={typeDocument._id}
                            >
                              {typeDocument.description}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                  <TextField
                    id="numberDocument"
                    label="Document"
                    variant="outlined"
                    {...register("numberDocument")}
                  />
                  <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    {...register("email")}
                  />
                  <TextField
                    id="cellphone"
                    label="Cell Phone"
                    variant="outlined"
                    {...register("cellphone")}
                  />
                  <TextField
                    id="password"
                    label="Password"
                    variant="outlined"
                    type="password"
                    {...register("password", {
                      required: "You must specify a password",
                      minLength: {
                        value: 8,
                        message: "Password must have at least 8 characters",
                      },
                    })}
                  />
                  {errors.password && <p>{errors.password.message}</p>}
                  <TextField
                    id="passwordRepeat"
                    label="Password Repeat"
                    variant="outlined"
                    type="password"
                    {...register("passwordRepeat", {
                      validate: (value) =>
                        value === password.current ||
                        "The passwords do not match",
                    })}
                  />
                  {errors.passwordRepeat && <p>{errors.passwordRepeat.message}</p>}
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
                            <MenuItem
                              key={index}
                              value={province.provincia_inei}
                            >
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
                    label="Address"
                    variant="outlined"
                    {...register("address")}
                  />
                </Box>
                <Stack>
                  <Button variant="contained" type="submit">
                    Registrar
                  </Button>
                </Stack>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default RegisterPage;
