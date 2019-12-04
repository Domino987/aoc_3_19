import React, { useState } from 'react';
import TextInput from './Input';
import Chart from './Chart';
import Chart3D from './Chart3D';
import Analysis from './Analysis';
import { createMuiTheme, ThemeProvider, CssBaseline, Grid, AppBar, Toolbar, Typography } from '@material-ui/core';


const theme = createMuiTheme({});

const Content = () => {

    const [data, setDate] = useState([]);
    const [data3D, set3DDate] = useState([]);

    return <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">
                    Advent of Code
                </Typography>
            </Toolbar>
        </AppBar>
        <Grid container={true} spacing={1}>
            <Grid item={true} xs={12}>
                <TextInput
                    set3DDate={set3DDate}
                    setInput={setDate} />
            </Grid>
            <Grid xs={6} item={true}>
                <Chart data={data} />
            </Grid>
            <Grid xs={6} item={true}>
                <Chart3D data={data3D} />
            </Grid>
            <Grid xs={12} item={true}>
                <Analysis data={data} />
            </Grid>
        </Grid>
    </ThemeProvider>
}


export default Content;