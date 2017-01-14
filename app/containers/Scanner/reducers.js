/**
 * Created by md on 14.01.17.
 */

import {
  ADD_SET,
} from './actions';

import { Record, fromJS } from 'immutable';

const initialState = fromJS({});

const modSet = Record({ id: '', name: '', command: '', modList: fromJS([]) });

export default function scannerReducer(state = initialState, action) {
  switch (action.type) {

    case ADD_SET:
      return state.update('sets', (map) => map.set(action.id,
        new modSet({
          id: action.id,
          name: `new set ${map.size + 1}`,
        })
      ));

    default:
      return state;
  }
}
