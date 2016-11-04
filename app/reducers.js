import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import main from './containers/Main/reducers';
import sets from './containers/Sets/reducers';
import mods from './containers/Mods/reducers'

const rootReducer = combineReducers({
  main,
  sets,
  mods,
  routing
});

export default rootReducer;
