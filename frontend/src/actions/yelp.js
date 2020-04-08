import axios from 'axios';
import { reset } from 'redux-form';
import history from '../history';
import { tokenConfig } from './auth';
import { GET_RECS } from './types';

// GET TODOS
export const getRecommendations = () => async (dispatch, getState) => {
    const res = await axios.get('/api/yelp/', tokenConfig(getState));
    dispatch({
      type: GET_RECS,
      payload: res.data
    });
  };