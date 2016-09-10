/**
 * Created by md on 10.09.16.
 */
import {
  INCREMENT_COUNTER,
  DECREMENT_COUNTER
} from './actions';
import { fromJS } from 'immutable';

const initialState = fromJS({
  counter: 0,
});

export default function counter(state = initialState, action) {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return state.update('counter', (val) => val + 1);

    case DECREMENT_COUNTER:
      return state.update('counter', (val) => val - 1);

    default:
      return state;
  }
}
