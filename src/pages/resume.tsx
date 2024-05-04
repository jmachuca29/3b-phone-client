import { Avatar, Box, CardHeader, Container, Divider, IconButton, Paper, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getSalebyUID } from 'src/services/sale';
import Grid from "@mui/material/Unstable_Grid2";
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ResumePage = () => {
    let { uuid } = useParams();

    const { isPending, isError, data, error } = useQuery({
        queryKey: ['saleDetail', uuid],
        queryFn: () =>
            uuid ? getSalebyUID(uuid) : Promise.reject("No uuid found")
    })

    if (isPending) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    console.log(data)

    return (
        <Container maxWidth="lg">
            <Stack>
                Orden: {uuid}
            </Stack>
            <Grid container spacing={2}>
                <Grid xs={8}>
                    <Stack>
                        <Paper>
                            <CardHeader
                                title="Details"
                                action={
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                            />
                            <Stack>
                                <div>
                                    <p>Product</p>
                                    <span>Cantidad</span>
                                    <span>Price</span>
                                </div>
                                <Stack>
                                    <Stack>
                                        <Box>Sub Total</Box>
                                        <Box>30$</Box>
                                    </Stack>
                                    <Stack>
                                        <Box>Shipping</Box>
                                        <Box>30$</Box>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Paper>
                    </Stack>
                </Grid>
                <Grid xs={4}>
                    <Paper>
                        <CardHeader
                            title="Customer Info"
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                        />
                        <Stack>
                            <Avatar>H</Avatar>
                            <Stack>
                                <Typography variant="subtitle2" gutterBottom>
                                    Lucian Obrien
                                </Typography>
                                <Box>ashlynn_ohara62@gmail.com</Box>
                            </Stack>
                        </Stack>
                        <Divider />
                        <CardHeader
                            title="Delivery"
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                        />
                        <Stack>
                            <Stack>
                                <Box>Ship by</Box>
                                <Box>DHL</Box>
                            </Stack>
                            <Stack>
                                <Box>Tracking No.</Box>
                                <Box>SPX037739199373</Box>
                            </Stack>
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}

export default ResumePage