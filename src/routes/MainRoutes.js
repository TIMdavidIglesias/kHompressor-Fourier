import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const RealTimeSimulator = Loadable(lazy(() => import('pages/realTimeSim')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: '/home',
      element: <DashboardDefault />
    },
    {
      path: '/realtime',
      element: <RealTimeSimulator />
    },
    // {
    //   path: 'color',
    //   element: <Color />
    // },
    // {
    //   path: 'dashboard',
    //   children: [
    //     {
    //       path: 'default',
    //       element: <DashboardDefault />
    //     }
    //   ]
    // },
    // {
    //   path: 'sample-page',
    //   element: <SamplePage />
    // },
    // {
    //   path: 'shadow',
    //   element: <Shadow />
    // },
    // {
    //   path: 'typography',
    //   element: <Typography />
    // },
    // {
    //   path: 'icons/ant',
    //   element: <AntIcons />
    // }
  ]
};

export default MainRoutes;
