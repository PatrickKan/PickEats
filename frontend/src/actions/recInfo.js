import { RESET_INDEX, UPDATE_INDEX } from './types';

export const updateIndex = (incrementBy) => {
    return {
      type: UPDATE_INDEX,
      payload: incrementBy
    }
  };
  
  export const resetIndex = () => {
    return {
      type: RESET_INDEX
    }
  };