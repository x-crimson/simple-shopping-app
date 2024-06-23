import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';
import { logout } from '../redux/actions/authActions';

const Homepage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <div className="logo">ONLINE <span>Store</span></div>
        <nav className="navbar">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#products">Products</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        <div className="auth-section">
          {user ? (
            <div className="user-dropdown">
              <span onClick={() => setDropdownOpen(!dropdownOpen)}>Hi {user.name}</span>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <button onClick={() => navigate('/update-details')}>Update Details</button>
                  <button onClick={() => navigate('/delete-account')}>Delete Account</button>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <button className="btn-secondary" onClick={() => navigate('/login')}>Login</button>
              <button className="btn-primary" onClick={() => navigate('/signup')}>Sign Up</button>
            </div>
          )}
        </div>
      </header>
      <div className="homepage-content">
        <div className="content-text">
          <h1>New Arrivals</h1>
          <h2>Just for You</h2>
          <p>For online order</p>
          <button className="order-button">30% Off</button>
        </div>
        <div className="content-image">
          <img src="shopinglady.png" alt="Shopping Lady" />
        </div>
      </div>
      <footer className="homepage-footer">
        <p>&copy; Company Name 2020. All rights reserved.</p>
        <div className="social-icons">
          <a href="#"><img src="facebook.png" alt="Facebook" /></a>
          <a href="#"><img src="instagram.png" alt="Instagram" /></a>
          <a href="#"><img src="whatsapp.png" alt="WhatsApp" /></a>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
