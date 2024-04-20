import { Box, Button, Paper, Stack, TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

const RegisterPage = () => {
  return (
    <Grid xs={12}>
      <Paper>
        <Box
          sx={{ mb: 2, display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}
        >
          <TextField id="serieNumber-survey" label="Name" variant="outlined" />
          <TextField id="imei_1-survey" label="Last Name" variant="outlined" />
          <TextField
            id="imei_2-survey"
            label="Type Document"
            variant="outlined"
          />
          <TextField
            id="serieNumber-survey"
            label="Document"
            variant="outlined"
          />
          <TextField id="imei_1-survey" label="Email" variant="outlined" />
          <TextField id="imei_1-survey" label="Cell Phone" variant="outlined" />
          <TextField id="imei_1-survey" label="Department" variant="outlined" />
          <TextField id="imei_1-survey" label="Province" variant="outlined" />
          <TextField id="imei_1-survey" label="District" variant="outlined" />
          <TextField id="imei_1-survey" label="Address" variant="outlined" />
        </Box>
        <Stack>
          <Button variant="contained" sx={{ mt: 1, mr: 1 }}>
            Registrar
          </Button>
        </Stack>
      </Paper>
    </Grid>
  );
};

export default RegisterPage;
