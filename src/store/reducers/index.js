// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import settings from './settings';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, settings });

export default reducers;
