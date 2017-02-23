/**
 * Created by md on 10.09.16.
 */
import {
  LOG
} from './actions';

import { fromJS } from 'immutable';

const initialState = fromJS({});

export default function setReducer(state = initialState, action) {
  switch (action.type) {
    case LOG:
      if(state.has(action.target)){
        return state.update(action.target, (list) => list.push(action.message));
      }
      return state.set(action.target, fromJS([]).push(action.message));
    default:
      return state;
  }
}
