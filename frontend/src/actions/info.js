import axios from 'axios';
import { reset } from 'redux-form';
import history from '../history';
import { tokenConfig } from './auth';
import { GET_TODOS, GET_TODO, ADD_TODO, DELETE_TODO, EDIT_TODO } from './types';

// GET TODOS
export const getInfos = (type) => async (dispatch, getState) => {
  const res = await axios.get(`/api/user/${type}/`, tokenConfig(getState));
  res.data = res.data.map((obj)=>{obj['type']=type; return obj})
  dispatch({
    type: GET_TODOS,
    payload: res.data
  });
};

// GET TODO
export const getInfo = (type, id) => async (dispatch, getState) => {
  const res = await axios.get(`/api/user/${type}/${id}/`, tokenConfig(getState));
  res.data['type'] = type;
  dispatch({
    type: GET_TODO,
    payload: res.data
  });
};

// ADD TODO
export const addInfo = (type, formValues) => async (dispatch, getState) => {
  const res = await axios.post(
    `/api/user/${type}/`,
    { ...formValues },
    tokenConfig(getState)
  );
  res.data['type'] = type;
  dispatch({
    type: ADD_TODO,
    payload: res.data
  });
  dispatch(reset('todoForm')); // フォーム送信後、値をクリアする
};

// DELETE TODO
export const deleteInfo = (type, id) => async (dispatch, getState) => {
  await axios.delete(`/api/user/${type}/${id}/`, tokenConfig(getState));
  dispatch({
    type: DELETE_TODO,
    payload: type+id
  });
  history.push('/profile');
};

// EDIT TODO
export const editInfo = (type, id, formValues) => async (dispatch, getState) => {
  const res = await axios.patch(
    `/api/user/${type}/${id}/`,
    formValues,
    tokenConfig(getState)
  );
  res.data['type'] = type;
  dispatch({
    type: EDIT_TODO,
    payload: res.data
  });
  history.push('/profile');
};
