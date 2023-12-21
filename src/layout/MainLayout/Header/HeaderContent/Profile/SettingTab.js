import { useState } from 'react';

// material-ui
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

// assets
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ListItem, Slider } from '../../../../../../node_modules/@mui/material/index';
import { maxTimeUpdate, sampleRateUpdate } from 'store/reducers/actions';
import { useDispatch, useSelector } from '../../../../../../node_modules/react-redux/es/exports';
import Button from 'themes/overrides/Button';

// ==============================|| HEADER PROFILE - SETTING TAB ||============================== //

const SettingTab = (props) => {

  const dispatch = useDispatch();
  const mTime = useSelector(state => state.settings.maxTime);
  const sRate = useSelector(state => state.settings.sampleRate);

  const [maxTime, setMaxTime] = useState(mTime);
  const [sampleRate, setSampleRate] = useState(sRate);

  const [openModal, setOpenModal] = useState(false);

  const handleSamplingChange = () => {
    dispatch(sampleRateUpdate(sampleRate));
    dispatch(maxTimeUpdate(maxTime));
    handleModal()
  }

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <>
      {/* <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, color: 'red' } }}>
        <ListItemButton>
          <ListItemIcon>
            <QuestionCircleOutlined />
          </ListItemIcon>
          <ListItemText primary="Max Time (ms)" sx={{ marginLeft: 'auto' }} />
          <ListItem sx={{ marginLeft: 'auto', marginRight: 2 }}>
            <Slider

              sx={{ mt: 2.5 }}
              max={10}
              aria-label="Max Time (ms)"
              defaultValue={maxTime}
              step={0.1}
              valueLabelDisplay="on"
              // onChange={setMaxTime}
              onChange={(e) => {
                setMaxTime(e.target.value)
              }}
            />
          </ListItem>
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <QuestionCircleOutlined />
          </ListItemIcon>
          <ListItemText primary="Sample Rate" sx={{ marginLeft: 'auto' }} />
          <ListItem sx={{ marginLeft: 'auto', marginRight: 2 }} >
            <Slider
              sx={{ mt: 2.5 }}
              max={100}
              min={10}
              aria-label="Sample Rate"
              defaultValue={sampleRate}
              step={10}
              valueLabelDisplay="on"
              onChange={(e) => {
                setSampleRate(e.target.value)
              }}
            />
          </ListItem>
        </ListItemButton>
        <ListItemButton onClick={handleModal}>
          <ListItem sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            Save
          </ListItem>
        </ListItemButton>
      </List> */}
    </>
  );
};

export default SettingTab;


