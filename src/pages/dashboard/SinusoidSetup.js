import { useEffect, useState } from 'react';

import { Grid, Slider, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useSelector } from '../../../node_modules/react-redux/es/exports';

const SinusoidSetup = (props) => {
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
    const [amplitude, setAmplitude] = useState(selOscillator.setup.amplitude);
    const [frequency, seFrequency] = useState(selOscillator.setup.frequency);
    const [phase, setPhase] = useState(selOscillator.setup.phase);
    const [delay, setDelay] = useState(selOscillator.setup.delay);

    const [symbol, setSymbol] = useState('Sin');

    useEffect(() => {
        handleValuesUpdate()
    }, [amplitude, frequency, phase, delay, symbol, maxTime, sampleRate]);

    useEffect(() => {
        setAmplitude(selOscillator.setup.amplitude)
        seFrequency(selOscillator.setup.frequency)
        setPhase(selOscillator.setup.phase)
        setDelay(selOscillator.setup.delay)
        setSymbol(selOscillator.setup.waveSymbol)
        handleValuesUpdate()
    }, [selectedOscillatorRef]);

    const handleValuesUpdate = (optName, value) => {
        const sOsc = oscillators.find(e => e.ref === selectedOscillatorRef)

        const nFrames = (maxTime * sampleRate) + 1
        const nDelayFrames = sOsc.setup.delay * sampleRate
        let chartP = [];
        let p = 0

        // delay
        for (let nt = 0; nt < nDelayFrames; nt++) {
            chartP.push(0)
        }

        for (let nt = 0; nt < nFrames - nDelayFrames; nt++) {
            const t = (nt - sOsc.setup.delay * sampleRate) * maxTime / sampleRate
            const Wt = 2 * Math.PI * sOsc.setup.frequency * t
            const phi = sOsc.setup.phase * 2 * Math.PI / 360
            if (symbol === 'Sin') {
                p = sOsc.setup.amplitude * Math.sin(Wt + phi)
            } else {
                p = sOsc.setup.amplitude * Math.cos(2 * Math.PI * sOsc.setup.frequency * ((nt - sOsc.setup.delay * sampleRate) * maxTime / sampleRate) + sOsc.setup.phase * 2 * Math.PI / 360)
            }

            chartP.push(p)
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
                    onChange={(e) => {
                        const sOsc = oscillators.find(e => e.ref === selectedOscillatorRef)
                        sOsc.setup.waveSymbol = e.target.value
                        setSymbol(e.target.value)
                        setOscillators([
                            ...oscillators.filter(e => e.ref !== selectedOscillatorRef), sOsc
                        ])
                    }}
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
                    <ToggleButton value="Sin" aria-label="Sin">
                        Sin
                    </ToggleButton>
                    <ToggleButton value="Cos" aria-label="Cos">
                        Cos
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
                    value={amplitude}
                    max={10}
                    onChange={(e) => {
                        handleValuesUpdate('amplitude', e.target.value)
                        setAmplitude(e.target.value)
                        // setSelOsc({...selOsc, setup:{...selOsc.setup, amplitude: e.target.value }})
                    }}
                    step={0.1}
                    valueLabelDisplay="on"
                />
            </Grid>
            <Grid item xs={12}>
                <Grid container xs={12} alignItems="center" justifyContent="space-between">
                    <Grid item sx={{ marginBottom: 2 }}>
                        Frequency (Hz - 1/s)
                    </Grid>
                </Grid>
                <Slider
                    sx={{ mt: 2.5 }}
                    aria-label="Always visible"
                    defaultValue={frequency}
                    value={frequency}
                    // getAriaValueText={'2'}
                    onChange={(e) => {
                        handleValuesUpdate('frequency', e.target.value)
                        seFrequency(e.target.value)
                        // setSelOsc({...selOsc, setup:{...selOsc.setup, frequency: e.target.value }})
                    }}
                    step={0.01}
                    max={2}
                    valueLabelDisplay="on"
                />
            </Grid>
            <Grid item xs={12}>
                <Grid container xs={12} alignItems="center" justifyContent="space-between">
                    <Grid item sx={{ marginBottom: 2 }}>
                        Phase (rads)
                    </Grid>
                </Grid>
                <Slider
                    sx={{ mt: 2.5 }}
                    aria-label="Always visible"
                    defaultValue={phase}
                    value={phase}
                    onChange={(e) => {
                        handleValuesUpdate('phase', e.target.value)
                        setPhase(e.target.value)
                        // setSelOsc({...selOsc, setup:{...selOsc.setup, phase: e.target.value }})
                    }}
                    step={0.1}
                    max={360}
                    min={0}
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
                    value={delay}
                    max={maxTime - 0.1}
                    onChange={(e) => {
                        handleValuesUpdate('delay', e.target.value)
                        setDelay(e.target.value)
                        // setSelOsc({...selOsc, setup:{...selOsc.setup, delay: e.target.value }})
                    }}
                    step={0.1}
                    valueLabelDisplay="on"
                />
            </Grid>
        </>
    );
};

export default SinusoidSetup;


