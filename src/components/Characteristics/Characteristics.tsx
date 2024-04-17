import { FormGroup, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  serieNumberRequired: string;
  imeiNumberOneRequired: string;
  imeiNumberTwoRequired: string;
};

export const Characteristics = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <TextField
          id="serieNumber-survey"
          label="Serie Number"
          variant="outlined"
          {...register("serieNumberRequired", { required: true })}
        />
        <TextField id="imei_1-survey" label="Imei 1" variant="outlined" {...register("imeiNumberOneRequired", { required: true })}/>
        <TextField id="imei_2-survey" label="Imei 2" variant="outlined" {...register("imeiNumberTwoRequired", { required: true })}/>
        {errors.imeiNumberTwoRequired && <span>This field is required</span>}
        <button type="submit">SUBMIT</button>
      </FormGroup>
    </form>
  );
};
