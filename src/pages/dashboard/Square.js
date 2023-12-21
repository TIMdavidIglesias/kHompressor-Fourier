import { useEffect, useState } from 'react';

import { Grid, Slider } from '@mui/material';
import { useSelector } from 'react-redux/es/exports';

const SquareSetup = (props) => {
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
    const [frequency, setFrequency] = useState(selOscillator.setup.frequency);
    const [delay, setDelay] = useState(selOscillator.setup.delay);

    useEffect(() => {
        handleValuesUpdate()
    }, [amplitude, delay, frequency]);

    useEffect(() => {
        setAmplitude(selOscillator.setup.amplitude)
        setFrequency(selOscillator.setup.frequency)
        setDelay(selOscillator.setup.delay)

        handleValuesUpdate()
    }, [selectedOscillatorRef]);

    const handleValuesUpdate = (optName, value) => {
        const sOsc = oscillators.find(e => e.ref === selectedOscillatorRef)
        const nDelayFrames = sOsc.setup.delay * sampleRate
        const nFrames = (maxTime * sampleRate) + 1
        const period = (1 / frequency)
        const nPeriodicFrames = period * sampleRate

        let delayP = [];
        let seriesPoints = [];
        let p = 0

        // delay
        for (let nt = 0; nt < nDelayFrames; nt++) {
            delayP.push(0)
        }

        let tt = 0
        let k = 1

        delayP.push(0)
        for (let nt = 0; nt < (nFrames - nDelayFrames -1); nt++) {

            if (tt >= (nPeriodicFrames)) {
                k = k * (-1)
                tt = 0
            }

            seriesPoints.push(amplitude/2 * k)

            tt++
        }

        if (optName) {
            sOsc.setup[optName] = value
        }

        sOsc.points = [...delayP, ...seriesPoints]

        setOscillators([
            ...oscillators.filter(e => e.ref !== selectedOscillatorRef),
            { ...sOsc }
        ])
    }

    return (
        <>
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
                        setFrequency(e.target.value)
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

export default SquareSetup;


