import _ from 'lodash';
import {
  GET_TODOS,
  GET_TODO,
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  POST_PREFERENCES
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case GET_TODOS:
      return {
        ...state,
        ..._.mapKeys(action.payload, (value, key)=>value.type+value.id),
      };
    case GET_TODO:
      return {
        ...state,
        [action.payload.type+action.payload.id]: action.payload
      };
    case ADD_TODO:
      return {
        ...state,
        [action.payload.type+action.payload.id]: action.payload
      };
    case EDIT_TODO:
      return {
        ...state,
        [action.payload.type+action.payload.id]: action.payload
      };
    case DELETE_TODO:
      return _.omit(state, action.payload);
    case POST_PREFERENCES:
      return {
        ...state,
        [action.payload.type+action.payload.id]: action.payload
      };
    default:
      return state;
  }
};
