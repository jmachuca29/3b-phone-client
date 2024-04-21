import {
  Box,
  Button,
  Container,
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
import { getUbigeo } from "src/services/ubigeo";

const mockUser = {
  name: "paul",
  lastName: "vega",
  typeDocument: "dni",
  numberDocument: "75741810",
  email: "ejdeza@hotmail.com",
  cellphone: "921883986",
  department: "1",
  provinces: "callao",
  district: "carmen de la legua",
  address: "jr. loreto 107",
};

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

const RegisterPage = () => {
  const [userForm, setUserForm] = useState(defaultFormValue);
  const [departments, setDepartments] = useState<any>([]);

  const userLoggedIn = true;

  const { isPending, error, data } = useQuery({
    queryKey: ["ubigeo"],
    queryFn: getUbigeo,
  });

  useEffect(() => {
    if (data) {
      const ubigeo = data.data;
      const departments = getUniqueDepartments(ubigeo);
      console.log(departments);
      setDepartments(departments);
    }
  }, [data]);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    // formState: { errors },
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

  useEffect(() => {
    if (userLoggedIn) {
      setUserForm(mockUser);
    }
  }, [userLoggedIn]);

  useEffect(() => {
    if (departments.length > 0) {
      console.log('departments', departments)
      setValue("name", userForm.name);
      setValue("lastName", userForm.lastName);
      setValue("typeDocument", userForm.typeDocument);
      setValue("numberDocument", userForm.numberDocument);
      setValue("email", userForm.email);
      setValue("cellphone", userForm.cellphone);
      setValue("department", userForm.department);
      setValue("provinces", userForm.provinces);
      setValue("district", userForm.district);
      setValue("address", userForm.address);
    }
  }, [setValue, userForm, departments]);

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
                    id="typeDocument"
                    label="Type Document"
                    variant="outlined"
                    {...register("typeDocument")}
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
                  <Controller
                    name="department"
                    control={control}
                    render={({ field }) => (
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
                    )}
                  />
                  <TextField
                    id="provinces"
                    label="Province"
                    variant="outlined"
                    {...register("provinces")}
                  />
                  <TextField
                    id="district"
                    label="District"
                    variant="outlined"
                    {...register("district")}
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
