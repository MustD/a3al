/**
 * Created by md on 10.09.16.
 */
import {
  SET_STATE,
} from './actions';
import { fromJS } from 'immutable';

const initialState = fromJS({
});

export default function counter(state = initialState, action) {
  switch (action.type) {
    case SET_STATE:
      return fromJS(action.data.main);

    default:
      return state;
  }
}
