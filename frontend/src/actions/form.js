import axios from 'axios';
import { reset } from 'redux-form';
import history from '../history';
import { tokenConfig } from './auth';
import { GET_RECS } from './types';

// GET TODOS
export const postPreferences = preference => async (dispatch, getState) => {
    const res = await axios.post('/api/user/prefers/', preference, tokenConfig(getState));
    dispatch({
      type: POST_PREFERENCES,
      payload: res.data
    });
  };