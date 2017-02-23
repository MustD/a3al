import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import main from './containers/Main/reducers';
import sets from './containers/Sets/reducers';
import mods from './containers/Mods/reducers'
import scanner from './containers/Scanner/reducers';
import logger from './containers/Logger/reducers';

const rootReducer = combineReducers({
  main,
  sets,
  mods,
  scanner,
  logger,
  routing
});

export default rootReducer;
