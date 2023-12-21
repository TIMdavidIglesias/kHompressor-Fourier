import { useEffect, useState } from 'react';

import { Grid, Slider, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useSelector } from 'react-redux/es/exports';

const StepRampSetup = (props) => {
    const {
        oscillators,
        setOscillators,
        selectedOscillatorRef,
    } = props

    // selected oscillator
    const selOscillator = oscillators.find(e => e.ref === selectedOscillatorRef)

        // sampling settings
    const maxTime = selOscillator.sampling.maxTime;
    const sampleRate = selOscillator.sampling.sampleRate;

    // setup
    const [symbol, setSymbol] = useState(selOscillator.setup.waveSymbol=== 'Ramp'|| selOscillator.setup.waveSymbol === 'Step' ? selOscillator.setup.waveSymbol : 'Step');

    // setup
    const [amplitude, setAmplitude] = useState(selOscillator.setup.amplitude);
    const [rampTime, setRampTime] = useState(selOscillator.setup.rampTime);
    const [delay, setDelay] = useState(selOscillator.setup.delay);

    useEffect(() => {
        handleValuesUpdate()
    }, [amplitude, rampTime, delay, symbol]);

    useEffect(() => {
        setAmplitude(selOscillator.setup.amplitude)
        setRampTime(selOscillator.setup.rampTime)
        setDelay(selOscillator.setup.delay)
        // setSymbol(selOscillator.setup.waveSymbol)
        handleValuesUpdate()
    }, [selectedOscillatorRef]);

    const handleValuesUpdate = (optName, value) => {
        const sOsc = oscillators.find(e => e.ref === selectedOscillatorRef)
        const nFrames = (maxTime * sampleRate) + 1
        const nRampFrames = rampTime * sampleRate
        const nDelayFrames = sOsc.setup.delay * sampleRate

        let chartP = [];
        let p = 0

        // delay
        for (let nt = 0; nt < nDelayFrames; nt++) {
            chartP.push(0)
        }

        if (symbol === 'Ramp') {
            for (let nt = 0; nt < nRampFrames; nt++) {
                p = amplitude * nt / (nRampFrames)
                chartP.push(p)
            }
        }

        for (let nt = 0; nt < nFrames - nDelayFrames - nRampFrames; nt++) {
            chartP.push(amplitude)
        }

        if (optName) {
            sOsc.setup[optName] = value
        }

        sOsc.points = chartP

        setOscillators([
            ...oscillators.filter(e => e.ref !== selectedOscillatorRef),
            { ...sOsc }
        ])
    }

    return (
        <>
            <Grid item xs={12}>
                <Grid container xs={12} alignItems="center" justifyContent="space-between">
                    <Grid item sx={{ marginBottom: 1 }}>
                        Symbol
                    </Grid>
                </Grid>
                <ToggleButtonGroup
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                    color="primary"
                    exclusive
                    aria-label="text alignment"
                    sx={{
                        marginBottom: 1,
                        '& .MuiToggleButton-root': {
                            '&:not(.Mui-selected)': {
                                borderTopColor: 'transparent',
                                borderBottomColor: 'transparent'
                            },
                            '&:first-of-type': {
                                borderLeftColor: 'transparent'
                            },
                            '&:last-of-type': {
                                borderRightColor: 'transparent'
                            },
                            '&.Mui-selected': {
                                borderColor: 'inherit',
                                // borderLeftColor: 'blue',
                                '&:hover': {
                                    bgcolor: 'white'
                                }
                            },
                            '&:hover': {

                                bgcolor: 'transparent',
                                // borderColor: 'blue',
                                // borderLeftColor: 'black',
                                zIndex: 2
                            }
                        }
                    }}
                >
                    <ToggleButton value="Step" aria-label="Step">
                        Step
                    </ToggleButton>
                    <ToggleButton value="Ramp" aria-label="Ramp">
                        Ramp
                    </ToggleButton>
                </ToggleButtonGroup>
            </Grid>
            <Grid item xs={12}>
                <Grid container xs={12} alignItems="center" justifyContent="space-between">
                    <Grid item sx={{ marginBottom: 2 }}>
                        Amplitude (m)
                    </Grid>
                </Grid>
                <Slider
                    sx={{ mt: 2.5, marginBottom: 2 }} // Aplica el margen directamente al Slider
                    aria-label="Always visible"
                    defaultValue={amplitude}
                    max={10}
                    onChange={(e) => {
                        handleValuesUpdate('amplitude', e.target.value)
                        setAmplitude(e.target.value)
                    }}
                    step={0.1}
                    valueLabelDisplay="on"
                />
            </Grid>
            <Grid item xs={12}>
                <Grid container xs={12} alignItems="center" justifyContent="space-between">
                    <Grid item sx={{ marginBottom: 2 }}>
                        Ramp base time (s)
                    </Grid>
                </Grid>
                <Slider
                    sx={{ mt: 2.5 }}
                    aria-label="Always visible"
                    defaultValue={rampTime}
                    disabled={symbol === 'Step'}
                    onChange={(e) => {
                        handleValuesUpdate('rampTime', e.target.value)
                        setRampTime(e.target.value)
                    }}
                    step={0.1}
                    max={maxTime - 0.1}
                    valueLabelDisplay="on"
                />
            </Grid>
            <Grid item xs={12}>
                <Grid container xs={12} alignItems="center" justifyContent="space-between">
                    <Grid item sx={{ marginBottom: 2 }}>
                        Delay (s)
                    </Grid>
                </Grid>
                <Slider
                    sx={{ mt: 2.5 }}
                    aria-label="Always visible"
                    defaultValue={delay}
                    max={maxTime - 0.1}
                    onChange={(e) => {
                        handleValuesUpdate('delay', e.target.value)
                        setDelay(e.target.value)
                    }}
                    step={0.1}
                    valueLabelDisplay="on"
                />
            </Grid>
        </>
    );
};

export default StepRampSetup;


