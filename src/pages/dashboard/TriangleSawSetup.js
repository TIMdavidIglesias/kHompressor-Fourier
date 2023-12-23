import { useEffect, useState } from 'react';

import { Grid, Slider } from '@mui/material';
import { useSelector } from 'react-redux/es/exports';

const TriangleSawSetup = (props) => {
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
    const [proportion, setProportion] = useState(selOscillator.setup.proportion);
    const [delay, setDelay] = useState(selOscillator.setup.delay);

    useEffect(() => {
        handleValuesUpdate()
    }, [amplitude, proportion, delay, frequency]);

    useEffect(() => {
        setAmplitude(selOscillator.setup.amplitude)
        setFrequency(selOscillator.setup.frequency)
        setProportion(selOscillator.setup.proportion)
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
        let periodicPoints = [];
        let seriesPoints = [];
        let p = 0

        // delay
        for (let nt = 0; nt < nDelayFrames+1; nt++) {
            delayP.push(0)
        }

        let upFrames = (nPeriodicFrames / 2) * proportion / 100
        let downFrames = (nPeriodicFrames / 2) - upFrames

        for (let nt = 0; nt < upFrames; nt++) {
            p = (amplitude) * nt / upFrames / 2
            periodicPoints.push(p)
        }

        for (let nt = 0; nt < downFrames; nt++) {
            p = (amplitude / 2) - (amplitude) * nt / downFrames / 2
            periodicPoints.push(p)
        }

        let tt = 0
        let k = 1
        for (let nt = 0; nt < (nFrames - nDelayFrames); nt++) {

            if (tt >= (periodicPoints.length)) {
                k = k * (-1)
                tt = 0
            }

            if (k === 1) {
                seriesPoints.push(periodicPoints[tt] * k)
            } else {
                seriesPoints.push(periodicPoints[periodicPoints.length - 1 - tt] * k)
            }

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
                        Sawtooth proportion (%)
                    </Grid>
                </Grid>
                <Slider
                    sx={{ mt: 2.5 }}
                    aria-label="Always visible"
                    defaultValue={proportion}
                    value={proportion}
                    onChange={(e) => {
                        handleValuesUpdate('proportion', e.target.value)
                        setProportion(e.target.value)
                        // setSelOsc({...selOsc, setup:{...selOsc.setup, phase: e.target.value }})
                    }}
                    step={0.1}
                    max={100}
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

export default TriangleSawSetup;


