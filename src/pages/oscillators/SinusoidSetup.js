import { useEffect, useState, } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import { Box, Grid, Slider, Stack, ToggleButton, ToggleButtonGroup } from '../../../node_modules/@mui/material/index';
import Typography from 'themes/overrides/Typography';

const SinusoidSetup = () => {
    const theme = useTheme();

    // setup
    const [symbol, setSymbol] = useState('sin');

    const { primary, secondary } = theme.palette.text;
    const info = theme.palette.info.light;

    return (
        <>
            <Stack spacing={2}>
                <ToggleButtonGroup
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                    color="primary"
                    exclusive
                    aria-label="text alignment"
                    sx={{
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
                    <ToggleButton value="sin" aria-label="sin">
                        Sin
                    </ToggleButton>
                    <ToggleButton value="cos" aria-label="cos">
                        Cos
                    </ToggleButton>
                </ToggleButtonGroup>
            </Stack>

            <Stack spacing={2}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        Amplitude (m)
                    </Grid>
                </Grid>
                <Slider
                    sx={{ mt: 2.5 }}
                    aria-label="Always visible"
                    defaultValue={80}
                    // getAriaValueText={'2'}
                    step={10}
                    valueLabelDisplay="on"
                />
            </Stack>
            <Stack spacing={2}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        Frequency (Hz - 1/s)
                    </Grid>
                </Grid>
                <Slider
                    sx={{ mt: 2.5 }}
                    aria-label="Always visible"
                    defaultValue={80}
                    // getAriaValueText={'2'}
                    step={10}
                    valueLabelDisplay="on"
                />
            </Stack>

            <Stack spacing={2}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        Period (s)
                    </Grid>
                </Grid>
                <Slider
                    sx={{ mt: 2.5 }}
                    aria-label="Always visible"
                    defaultValue={80}
                    // getAriaValueText={'2'}
                    step={10}
                    valueLabelDisplay="on"
                />
            </Stack>

            <Stack spacing={2}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        Phase (rads/s)
                    </Grid>
                </Grid>
                <Slider
                    sx={{ mt: 2.5 }}
                    aria-label="Always visible"
                    defaultValue={80}
                    // getAriaValueText={'2'}
                    step={10}
                    valueLabelDisplay="on"
                />
            </Stack>

            <Stack spacing={2}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        Delay (s)
                    </Grid>
                </Grid>
                <Slider
                    sx={{ mt: 2.5 }}
                    aria-label="Always visible"
                    defaultValue={80}
                    // getAriaValueText={'2'}
                    step={10}
                    valueLabelDisplay="on"
                />
            </Stack>
        </>
    );
};

export default SinusoidSetup;
