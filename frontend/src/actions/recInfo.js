import { VIEW_INDEX, UPDATE_INDEX } from './types';

export const updateIndex = (incrementBy) => {
    return {
      type: UPDATE_INDEX,
      payload: incrementBy
    }
  };
  
  export const viewIndex = () => {
    return {
      type: VIEW_INDEX
    }
  };