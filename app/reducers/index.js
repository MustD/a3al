import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import exampleReducer from './example';

const rootReducer = combineReducers({
  exampleReducer,
  routing
});

export default rootReducer;
