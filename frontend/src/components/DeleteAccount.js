import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { logout } from '../redux/actions/authActions';
import './AuthPage.css';

const DeleteAccount = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/auth/${user._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      dispatch(logout());
      navigate('/');
    } catch (error) {
      console.error("Delete Error:", error.response || error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Delete Account</h2>
        <p>Are you sure you want to delete your account?</p>
        <button onClick={handleDelete} className="btn-primary">Delete Account</button>
      </div>
    </div>
  );
};

export default DeleteAccount;
