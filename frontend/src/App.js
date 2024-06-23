import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import Homepage from './components/Homepage';
import RegistrationPage from './components/RegistrationPage';
import LoginPage from './components/LoginPage';
import UpdateDetails from './components/UpdateDetails';
import DeleteAccount from './components/DeleteAccount';
// import HomePage from './components/HomePage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/signup" element={<RegistrationPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/update-details" element={<UpdateDetails />} />
            <Route path="/delete-account" element={<DeleteAccount />} />
            <Route path="/home" element={<Homepage />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
