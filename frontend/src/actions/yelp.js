import axios from 'axios';
import { reset } from 'redux-form';
import history from '../history';
import { tokenConfig } from './auth';
import { GET_RECS } from './types';

// GET TODOS
export const getRecommendations = (offset) => async (dispatch, getState) => {
    var config = tokenConfig(getState);
    config['params'] = {
      'offset': offset
    }
    console.log(config);
    const res = await axios.get('/api/yelp', config);
    dispatch({
      type: GET_RECS,
      payload: res.data
    });
  };