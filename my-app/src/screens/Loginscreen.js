import React, { useState } from 'react';
import './register.css';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';

function Loginscreen() {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function login() {
    const user = {
      email: Email,
      password: Password,
    };

    try {
      setLoading(true);
      setError(null); // Clear error before new attempt
      const result = await axios.post('/api/users/login', user);
      setLoading(false);
      localStorage.setItem('currentUser', JSON.stringify(result.data));
      window.location.href = '/home'; // Redirect to home page if login successful
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 401) {
        setError('Invalid Email or Password');
      } else {
        setError('Something went wrong. Please try again later.');
      }
    }
  }

  return (
    <div className="main">
      {loading && <Loader />}
      <div className="row justify-content-center mt-5">
        <div className="col-md-5">
          <div className="register-form">
            <h1>Login</h1>
            {error && <Error message={error} />} {/* Error is displayed inside the form */}
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn btn-primary" onClick={login}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginscreen;
