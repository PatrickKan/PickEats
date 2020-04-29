import {
  UPDATE_INDEX
} from '../actions/types';

export default (state = {index: 0}, action) => {
  switch (action.type) {
    case UPDATE_INDEX:
        return {
          ...state,
          index: state.index+action.payload
        };
    default:
        return state;
  }
};