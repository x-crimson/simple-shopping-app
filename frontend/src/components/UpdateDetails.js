import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AuthPage.css';

const UpdateDetails = () => {
  const user = useSelector((state) => state.auth.user);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState(user.phone);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(`http://localhost:5000/api/auth/${user._id}`, { name, email, password, phone }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      dispatch({ type: 'UPDATE_USER_SUCCESS', payload: res.data });
      navigate('/');
    } catch (error) {
      console.error("Update Error:", error.response || error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Update Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-primary">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateDetails;
