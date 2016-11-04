import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import main from './containers/Main/reducers.js';
import sets from './containers/Sets/reducers';

const rootReducer = combineReducers({
  main,
  sets,
  routing
});

export default rootReducer;
