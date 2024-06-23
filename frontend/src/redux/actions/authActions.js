import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

export const signup = (name, email, password, phone) => async dispatch => {
  try {
    const res = await axios.post(`${BASE_URL}/signup`, { name, email, password, phone });
    dispatch({ type: 'SIGNUP_SUCCESS', payload: res.data });
    return Promise.resolve();
  } catch (error) {
    console.error("Signup Error:", error.response || error.message);
    dispatch({ type: 'SIGNUP_FAILURE', payload: error.response ? error.response.data : error.message });
    return Promise.reject(error);
  }
};

export const login = (email, password) => async dispatch => {
  try {
    const res = await axios.post(`${BASE_URL}/login`, { email, password });
    const { token, user } = res.data;
    localStorage.setItem('token', token); // Store the token in local storage
    dispatch({ type: 'LOGIN_SUCCESS', payload: { token, user } });
  } catch (error) {
    console.error("Login Error:", error.response || error.message);
    dispatch({ type: 'LOGIN_FAILURE', payload: error.response ? error.response.data : error.message });
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  return { type: 'LOGOUT' };
};

export const updateUser = (userId, updateData) => async dispatch => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.put(`${BASE_URL}/${userId}`, updateData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    dispatch({ type: 'UPDATE_USER_SUCCESS', payload: res.data });
    return Promise.resolve();
  } catch (error) {
    console.error("Update Error:", error.response || error.message);
    return Promise.reject(error);
  }
};

export const deleteUser = (userId) => async dispatch => {
  try {
    const token = localStorage.getItem('token');
    await axios.delete(`${BASE_URL}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    dispatch(logout());
    return Promise.resolve();
  } catch (error) {
    console.error("Delete Error:", error.response || error.message);
    return Promise.reject(error);
  }
};
