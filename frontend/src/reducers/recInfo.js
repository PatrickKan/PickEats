import {
  UPDATE_INDEX,
  RESET_INDEX,
  GET_RECS
} from '../actions/types';

const initialState = {
  index: 0,
  businesses: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_INDEX:
      return {
        ...state,
        index: state.index+action.payload
      };
    case RESET_INDEX:
      return {
        ...initialState
      };
    case GET_RECS:
      return {
        ...state,
        'businesses': {
            ...state.businesses,
            ..._.mapKeys(action.payload.businesses, 'id')
        }
      };
    default:
        return state;
  }
};