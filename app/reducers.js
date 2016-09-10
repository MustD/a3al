import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import mainReducer from './containers/Main/reducers.js';

const rootReducer = combineReducers({
  mainReducer,
  routing
});

export default rootReducer;
