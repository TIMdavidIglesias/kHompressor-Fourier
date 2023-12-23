import { useEffect, useState } from 'react';

// material-ui
import {
  Box,
  Button,
  Grid,
  Stack,
  Typography,
} from '@mui/material';

import {
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Slider,
  TextField,
  ToggleButton,
  ToggleButtonGroup
} from '../../../node_modules/@mui/material/index';

import Switch from '@mui/material/Switch';

// project import
import OscillatorChart from './OscillatorChart';
import SinusoidSetup from './SinusoidSetup';

// assets
import StepRampSetup from './StepRampSetup';
import TriangleSawSetup from './TriangleSawSetup';
import SquareSetup from './Square';

// icons
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PermDataSettingIcon from '@mui/icons-material/PermDataSetting';
import LinearSimulator from 'coreSim/jsLSA/LinearSimulator';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
  // CONFIG PANEL SETTINGS
  const [openModal, setOpenModal] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [openSimulationSettings, setOpenSimulationSettings] = useState(false);

  // SAMPLING SETTINGS
  const [maxTimeSettings, setMaxTimeSettings] = useState(5);
  const [sampleRateSettings, setSampleRateSettings] = useState(50);

  // SIMULATOR SETTINGS
  const [K, setK] = useState(1);
  const [Zeta, setZeta] = useState(0.2);
  const [Wn, setWn] = useState(0.5);
  const [autoSimulate, setAutoSimulate] = useState(true);
  // const [linearSimulationResults, setLinearSimulationResults] = useState(true);

  const [totalsInput, setTotalsInput] = useState([]);
  const [lSimOutput, setLSimOutput] = useState([]);

  // SESSION
  // Oscillators
  const newOscRef = `oscX_${Math.floor(Date.now() / 1000)}`
  const newOscillatorTemplate = [{
    name: 'NewOscillator',
    ref: newOscRef,
    points: [],
    waveType: 'Sinusoidal',
    sampling: {
      maxTime: 5,
      sampleRate: 50,
    },
    setup: {
      waveSymbol: 'Sin',
      amplitude: 1,
      frequency: 0.2,
      phase: 0,
      delay: 0,
      rampTime: 0,
      proportion: 50,
    }
  }]

  const newOscillatorListTemplate = [{
    name: 'NewOscillator',
    ref: newOscRef,
  }]

  const [oscillators, setOscillators] = useState(newOscillatorTemplate);
  const [oscillatorList, setOscillatorList] = useState(newOscillatorListTemplate);
  const [selectedOscillatorRef, setSelectedOscillatorRef] = useState(newOscRef);

  const handleModalOpen = () => {
    if(openModal){
    setOpenSettings(false);
    setOpenSimulationSettings(false);
    }
    setOpenModal(!openModal);

  };

  const handleSettingsOpen = () => {
    setOpenSettings(!openSettings);
    setOpenModal(false);
    setOpenSimulationSettings(false);
  };

  const handleSimulationSettingsOpen = () => {
    setOpenSimulationSettings(!openSimulationSettings);
    setOpenModal(false);
    setOpenSettings(false);
  }

  const handleSamplingChange = () => {
    const newOscRef = `oscX_${Math.floor(Date.now() / 1000)}`
    setOscillatorList([{
      name: 'NewOscillator',
      ref: newOscRef,
    }])
    setSelectedOscillatorRef(newOscRef)
    setOscillators([{
      name: 'NewOscillator',
      ref: newOscRef,
      points: [],
      waveType: 'Sinusoidal',
      sampling: {
        maxTime: maxTimeSettings,
        sampleRate: sampleRateSettings,
      },
      setup: {
        waveSymbol: 'Sin',
        amplitude: 1,
        frequency: 0.2,
        phase: 0,
        delay: 0,
        rampTime: 0,
        proportion: 50,
      }
    }])

    setTotalsInput([]);
    executeLinearSimulation()
  }

  const handleOscillatorTabChange = (nVal) => {
    setSelectedOscillatorRef(nVal);
  };

  const handleAddOscillator = () => {
    const newOscRef = `oscX_${Math.floor(Date.now() / 1000)}`

    const newOscillatorListUpdated = [...oscillatorList, {
      name: 'NewOscillator',
      ref: newOscRef,
    }]

    const newOscillatorsUpdated = [...oscillators, {
      name: 'NewOscillator',
      ref: newOscRef,
      points: [],
      waveType: 'Sinusoidal',
      sampling: {
        maxTime: 5,
        sampleRate: 50,
      },
      setup: {
        waveSymbol: 'Sin',
        amplitude: 1,
        frequency: 0.2,
        phase: 0,
        delay: 0,
        rampTime: 0,
        proportion: 50,
      }
    }]

    setSelectedOscillatorRef(newOscRef)

    setOscillators(newOscillatorsUpdated)
    setOscillatorList(newOscillatorListUpdated)

    setTotalsInput(calculateTotalsInput(newOscillatorsUpdated));
  };

  const handleDeleteOscillator = () => {
    const newSelectedIndex = oscillatorList.filter(o => o.ref !== selectedOscillatorRef)[0].ref

    setSelectedOscillatorRef(newSelectedIndex)
    setOscillatorList([...oscillatorList.filter(o => o.ref !== selectedOscillatorRef)])
    setOscillators([...oscillators.filter(o => o.ref !== selectedOscillatorRef)])

    setTotalsInput(calculateTotalsInput(oscillatorList.filter(o => o.ref !== selectedOscillatorRef)));
  };

  const handleChangeName = (nVal) => {
    const oscList = oscillatorList.find(o => o.ref === selectedOscillatorRef)
    oscList.name = nVal
    setOscillatorList([...oscillators.map((o) => {
      if (o.ref === selectedOscillatorRef) {
        o.name = nVal
      }
      return o
    })])

    const osc = oscillators.find(o => o.ref === selectedOscillatorRef)
    osc.name = nVal
    setOscillators([...oscillators.filter(o => o.ref !== selectedOscillatorRef), osc])
  }

  const calculateTotalsInput = (targetOscillators) => {
    let totalsPoints = []
    const sortedOscs = targetOscillators.map(o => o.points)

    totalsPoints = sortedOscs.reduce((res, r) => {
      r.forEach((val, i) => {
        res[i] = (res[i] || 0) + val;
      });
      return res;
    }, []);

    return totalsPoints;
  }

  // LINEAR SIMULATION & CONVOLUTION
  const GRAVITY = 9.81;

  const executeLinearSimulation = () => {
    const totalsInput = calculateTotalsInput(oscillators)
    setTotalsInput(totalsInput);

    const linearSimulator = new LinearSimulator(Wn, Zeta, K, maxTimeSettings, sampleRateSettings, GRAVITY)
    linearSimulator.linearSimulation(totalsInput)

    setLSimOutput(linearSimulator.output)

    // console.log(linearSimulator.output)
  }

  // useEffect(() => {
  //   executeLinearSimulation()
  //   // const physics = new Physics(linearSimulator.transferFunction, inputData, linearSimulator.output, GRAVITY)
  //   // physics.calculateFullAngles()
  //   // setAngles(physics.angles);
  // }, [oscillators])

  useEffect(() => {
    executeLinearSimulation()
    // const physics = new Physics(linearSimulator.transferFunction, inputData, linearSimulator.output, GRAVITY)
    // physics.calculateFullAngles()
    // setAngles(physics.angles);
  }, [Wn, Zeta, K, oscillators])

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>

      <Grid item xs={6} sx={{ mb: -2.25 }}>
        <Typography variant="h5">kHompressor Oscillators</Typography>
      </Grid>

      <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Box xs={12}>
          <Fab color="error" sx={{ marginRight: 5 }} onClick={handleSettingsOpen}>
            < SettingsOutlinedIcon />
          </Fab>
        </Box>

        <Box xs={12} >
          <Fab color="info" onClick={handleSimulationSettingsOpen} >
            < PermDataSettingIcon />
          </Fab>
        </Box>
      </Grid>

      {openSettings  ?
        <Grid xs={12} sx={{ mt: -2.25, display: 'flex', justifyContent: "space-between" }}>
          <Grid item xs={0} md={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>

          </Grid>
          <Grid item xs={12} md={6} sx={{ borderColor: 'divider', justifyContent: "flex-end" }} >
            <Box>
              <Dialog
                open={openModal}
                fullWidth={false}
                maxWidth={'xs'}
                onClose={handleModalOpen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Sampling settings"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    <strong>Changing the sampling setup will reset all the oscillators and results. Are you sure you want to continue?</strong>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <ListItem variant="contained" sx={{ display: 'flex', color: 'red' }} onClick={handleModalOpen}>
                    <span style={{ color: 'red', cursor: 'pointer' }}>Cancel</span>
                  </ListItem>
                  <ListItemButton onClick={handleModalOpen}>
                    <ListItem sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <span style={{ cursor: 'pointer' }} onClick={handleSamplingChange}>Save</span>
                    </ListItem>
                  </ListItemButton>
                </DialogActions>
              </Dialog>

              <List component="nav" sx={{ p: 0 }}>
                <ListItemButton>
                  <ListItemText primary="Max Time (ms)" sx={{ marginLeft: 'auto' }} />
                  <ListItem sx={{ marginLeft: 'auto', marginRight: 2 }}>
                    <Slider
                      sx={{ mt: 2.5 }}
                      max={10}
                      aria-label="Max Time (ms)"
                      defaultValue={maxTimeSettings}
                      step={0.1}
                      valueLabelDisplay="on"
                      onChange={(e) => {
                        setMaxTimeSettings(e.target.value)
                      }}
                    />
                  </ListItem>
                </ListItemButton>
                <ListItemButton>
                  <ListItemText primary="Sample Rate" sx={{ marginLeft: 'auto' }} />
                  <ListItem sx={{ marginLeft: 'auto', marginRight: 2 }} >
                    <Slider
                      sx={{ mt: 2.5 }}
                      max={100}
                      min={10}
                      aria-label="Sample Rate"
                      defaultValue={sampleRateSettings}
                      step={10}
                      valueLabelDisplay="on"
                      onChange={(e) => {
                        setSampleRateSettings(e.target.value)
                      }}
                    />
                  </ListItem>
                </ListItemButton>
                <ListItemButton>
                  <Button
                    size="small"
                    color="warning"
                    variant="contained"
                    onClick={() => handleModalOpen()}
                  >
                    Update Settings
                  </Button>
                </ListItemButton>
              </List>
            </Box>
          </Grid>
        </Grid>
        : <></>}

      {openSimulationSettings  ?
        <Grid xs={12} sx={{ mt: -2.25, display: 'flex', justifyContent: "space-between" }}>
          <Grid item xs={0} md={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>

          </Grid>
          <Grid item xs={12} md={6} sx={{ borderColor: 'divider', justifyContent: "flex-end" }} >
            <Box>
              <List component="nav" sx={{ p: 0 }}>
                <ListItemButton>
                  <ListItemText primary="Proportion (Gain)" sx={{ marginLeft: 'auto' }} />
                  <ListItem sx={{ marginLeft: 'auto', marginRight: 2 }}>
                    <Slider
                      sx={{ mt: 2.5 }}
                      max={10}
                      aria-label="Proportion (Gain)"
                      defaultValue={K}
                      step={0.1}
                      valueLabelDisplay="on"
                      onChange={(e) => {
                        setK(e.target.value)
                      }}
                    />
                  </ListItem>
                </ListItemButton>
                <ListItemButton>
                  <ListItemText primary="Damping coeff." sx={{ marginLeft: 'auto' }} />
                  <ListItem sx={{ marginLeft: 'auto', marginRight: 2 }} >
                    <Slider
                      sx={{ mt: 2.5 }}
                      max={0.99}
                      min={0.01}
                      aria-label="Damping coeff."
                      defaultValue={Zeta}
                      step={0.01}
                      valueLabelDisplay="on"
                      onChange={(e) => {
                        setZeta(e.target.value)
                      }}
                    />
                  </ListItem>
                </ListItemButton>
                <ListItemButton>
                  <ListItemText primary="Natural freq. (Hz)" sx={{ marginLeft: 'auto' }} />
                  <ListItem sx={{ marginLeft: 'auto', marginRight: 2 }} >
                    <Slider
                      sx={{ mt: 2.5 }}
                      max={5}
                      min={0.01}
                      aria-label="Natural freq. (Hz)"
                      defaultValue={Wn}
                      step={0.01}
                      valueLabelDisplay="on"
                      onChange={(e) => {
                        setWn(e.target.value)
                      }}
                    />
                  </ListItem>
                </ListItemButton>
                <ListItemButton>
                  <ListItemText primary="Auto display" sx={{ marginLeft: 'auto' }} />
                  <ListItem sx={{ marginLeft: 'auto', marginRight: 2 }} >
                    <Switch checked={autoSimulate} onChange={(e) => setAutoSimulate(!autoSimulate)} size="large" />
                  </ListItem>
                </ListItemButton>
              </List>
            </Box>
          </Grid>
        </Grid>
        : <></>}

      {/* <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title={`Oscillators: ${oscillators.length}`} count="4,42,236" percentage={59.3} extra="35,000" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Users" count="78,250" percentage={70.5} extra="8,900" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Order" count="18,800" percentage={27.4} isLoss color="warning" extra="1,943" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Sales" count="$35,078" percentage={27.4} isLoss color="warning" extra="$20,395" />
      </Grid> */}

      <Grid item xs={12} sx={{ borderBottom: 1 }}>
        <Box sx={{ borderColor: 'divider', mb: 2, }}>
          {/* <TabList onChange={handleOscillatorTabChange} aria-label="lab API tabs example"> */}
          {/* {oscillatorList.map((o, i) => <TabContext key={i} label={o.name} value={o.ref} />)} */}
          <ButtonGroup variant="text" aria-label="text button group">
            {oscillatorList.map((o, i) =>
              <Button key={i}
                sx={{ marginRight: '20px' }}
                variant={o.ref === selectedOscillatorRef ? "outlined" : 'dashed'}
                color={o.ref === selectedOscillatorRef ? "info" : 'secondary'}
                label={o.name}
                value={o.ref}
                onClick={() => handleOscillatorTabChange(o.ref)}>
                {o.name}
              </Button>)}
          </ButtonGroup>
          {/* </TabList> */}
        </Box>

        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
          <Grid item xs={12} sm={6} lg={8}>
            <Grid container sx={{ display: 'flex', justifyContent: "space-between" }}>
              <Typography variant="h5">
                Oscillator: {oscillators.find(o => o.ref === selectedOscillatorRef).name || ''}
              </Typography>
              <Grid >
                <Button
                  size="small"
                  color="primary"
                  variant="contained"
                  onClick={() => handleAddOscillator()}
                  sx={{ marginRight: '20px' }}
                >
                  Add Oscillator +
                </Button>

                <Button
                  size="small"
                  color="error"
                  variant="contained"
                  onClick={() => handleDeleteOscillator()}
                  disabled={oscillatorList.length <= 1}
                >
                  X
                </Button>
              </Grid>
              <Grid item xs={12}>
                <OscillatorChart
                  selectedOscillatorRef={selectedOscillatorRef}
                  oscillators={oscillators}
                  totalsInput={totalsInput}
                  autoSimulate={autoSimulate}
                  lSimOutput={lSimOutput}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6} lg={4}>
            <Typography variant="h5" >
              Wave Setup
            </Typography>
            <Grid container item xs={12} sm={6} lg={12}>
              <Grid item xs={12} sm={6} lg={4} sx={{ marginRight: 1 }}>
                <Typography variant="h6" color="textSecondary" sx={{ p: 1, m: 1 }}>
                  Oscillator name
                </Typography>
                <TextField
                  onChange={(e) => handleChangeName(e.target.value)}
                  required
                  id="oName"
                  label="Required"
                  value={oscillators.find(o => o.ref === selectedOscillatorRef).name}
                  defaultValue={oscillators.find(o => o.ref === selectedOscillatorRef).name}
                />
              </Grid>

              <Grid item xs={12} sm={6} lg={4}>
                <Typography variant="h6" color="textSecondary" sx={{ p: 1, m: 1 }}>
                  Oscillator ref
                </Typography>
                <TextField
                  disabled
                  id="oRef"
                  defaultValue={oscillators.find(o => o.ref === selectedOscillatorRef).ref}
                  value={oscillators.find(o => o.ref === selectedOscillatorRef).ref}
                />
              </Grid>
            </Grid>

            <Typography variant="h6" color="textSecondary" sx={{ p: 1, m: 1 }} >
              Wave type
            </Typography>

            <ToggleButtonGroup
              value={oscillators.find(o => o.ref === selectedOscillatorRef).waveType}
              onChange={(e) => {
                const oscWaveType = oscillators.find(o => o.ref === selectedOscillatorRef)
                oscWaveType.waveType = e.target.value
                setOscillators([...oscillators.filter(o => o.ref !== selectedOscillatorRef), oscWaveType])

                // setOscillatorType(e.target.value)
                // oscillators.find(o => o.ref === selectedOscillatorRef).waveType
              }}
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
              }}>
              <ToggleButton value="Sinusoidal" aria-label="Sinusoidal">
                Sinusoid
              </ToggleButton>
              <ToggleButton value="StepRamp" aria-label="StepRamp">
                Step/Ramp
              </ToggleButton>
              <ToggleButton value="SawTriangle" aria-label="SawTriangle">
                Saw/Triang.
              </ToggleButton>
              <ToggleButton value="Square" aria-label="Square">
                Square
              </ToggleButton>
            </ToggleButtonGroup>
            <Stack spacing={0}>
              <Typography variant="h6" color="textSecondary" sx={{ p: 1, m: 1 }}>
                Wave setup
              </Typography>
              <Grid item xs={12} >
                {oscillators.find(o => o.ref === selectedOscillatorRef).waveType === 'Sinusoidal' ?
                  <SinusoidSetup
                    oscillators={oscillators}
                    setOscillators={setOscillators}
                    selectedOscillatorRef={selectedOscillatorRef}
                  /> :
                  oscillators.find(o => o.ref === selectedOscillatorRef).waveType === 'StepRamp' ?
                    <StepRampSetup
                      oscillators={oscillators}
                      setOscillators={setOscillators}
                      selectedOscillatorRef={selectedOscillatorRef}
                    /> :
                    oscillators.find(o => o.ref === selectedOscillatorRef).waveType === 'SawTriangle' ?
                      <TriangleSawSetup
                        oscillators={oscillators}
                        setOscillators={setOscillators}
                        selectedOscillatorRef={selectedOscillatorRef}
                      /> :
                      oscillators.find(o => o.ref === selectedOscillatorRef).waveType === 'Square' ?
                        <SquareSetup
                          oscillators={oscillators}
                          setOscillators={setOscillators}
                          selectedOscillatorRef={selectedOscillatorRef}
                        /> :
                        <>s</>}
              </Grid>
            </Stack>
          </Grid>
        </Grid>
      </Grid>













    </Grid >
  );
};

export default DashboardDefault;
