import React, { useState, useEffect, useMemo } from 'react';

import {
    Box,
    Button,
    Grid,
    Stack,
    Typography,
} from '@mui/material';

import './style.css'
import CranePhysics from './CranePhysics';
import MainCard from 'components/MainCard';
import SimDataPlot from './SimDataPlot';
import LinearSimulator from 'coreSim/jsLSA/LinearSimulator';

// ==============================|| INCOME AREA CHART ||============================== //

const RealTimeSimulator =(props) => {
    const GRAVITY = 9.81
    const [K, setK] = useState(1);
    const [Zeta, setZeta] = useState(0.8);
    const [YThread, setYThread] = useState(300);

    const newLinearSimulator = useMemo(() => {
        return (new LinearSimulator(Math.sqrt(GRAVITY / YThread), Zeta, K, 1, 100, GRAVITY));
      }, [Zeta, K]);

    const [vPlot, setVPlot] = useState([]);
    const [xPlot, setXPlot] = useState([]);
    const [lSimPlot, setLSimPlot] = useState([]);

    return (
        <>
            <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={12} sm={4} >
                    <MainCard contentSX={{ p: 2.25 }}>
                        <Stack spacing={0.5}>
                            <Typography variant="h6" color="textSecondary">
                                RealTime Linear Simulation (m)
                            </Typography>
                        </Stack>
                        <Box sx={{ pt: 2.25 }}>
                            <SimDataPlot dataPlot={lSimPlot} plotLabel='RealTime Linear Simulation (m)' />
                        </Box>
                    </MainCard>
                </Grid>

                <Grid item xs={12} sm={4} >
                    <MainCard contentSX={{ p: 2.25 }}>
                        <Stack spacing={0.5}>
                            <Typography variant="h6" color="textSecondary">
                                {'Velocity (m/s)'}
                            </Typography>
                        </Stack>
                        <Box sx={{ pt: 2.25 }}>
                            <SimDataPlot dataPlot={vPlot.map(i=>i)} plotLabel='Velocity (m/s)' />
                        </Box>
                    </MainCard>
                </Grid>

                <Grid item xs={12} sm={4} >
                    <MainCard contentSX={{ p: 2.25 }}>
                        <Stack spacing={0.5}>
                            <Typography variant="h6" color="textSecondary">
                                {'Displacement (m)'}
                            </Typography>
                        </Stack>
                        <Box sx={{ pt: 2.25 }}>
                            <SimDataPlot dataPlot={xPlot.map(i=>i/100)} plotLabel='Displacement (m)' />
                        </Box>
                    </MainCard>
                </Grid>
            </Grid >
            {/* <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Users" count="78,250" percentage={70.5} extra="8,900" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Order" count="18,800" percentage={27.4} isLoss color="warning" extra="1,943" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Sales" count="$35,078" percentage={27.4} isLoss color="warning" extra="$20,395" />
            </Grid> */}

            < CranePhysics setVPlot={setVPlot} setXPlot={setXPlot} setLSimPlot={setLSimPlot} linearSimulator={newLinearSimulator} YThread={YThread} setYThread={setYThread} GRAVITY={GRAVITY}  />
        </>
    );
};

export default RealTimeSimulator;
