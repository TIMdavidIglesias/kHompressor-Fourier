// assets
import { DashboardOutlined } from '@ant-design/icons';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';

// icons
const icons = {
  DashboardOutlined,
  HistoryToggleOffIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-simulator',
  title: 'Oscillators',
  type: 'group',
  children: [
    {
      id: 'oscillators',
      title: 'Oscillators',
      type: 'item',
      url: '/home',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'rtsimulation',
      title: 'Real time Simulation',
      type: 'item',
      url: '/realtime',
      icon: icons.HistoryToggleOffIcon,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
