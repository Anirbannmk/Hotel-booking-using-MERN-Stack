import React, { useState } from 'react';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Success from '../components/success';
import './register.css';
import axios from 'axios';

function Registerscreen() {
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  async function register() {
    if (Password === cpassword) {
      const user = {
        name: Name,
        email: Email,
        password: Password,
        cpassword: cpassword
      };

      console.log('Form Data:', user);

      try {
        setLoading(true);
        setError(false); // Reset error state
        setSuccess(false); // Reset success state

        const result = await axios.post('/api/users/register', user);
        
        console.log('Response Data:', result.data);

        setLoading(false);
        setSuccess(true);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    } else {
      console.log('Passwords do not match');
      setError(true);
    }
  }

  return (
    <div className='main'>
      <div className="row justify-content-center mt-5">
        <div className="col-md-5">
          <div className="register-form">
            <h1>Register</h1>

            {/* Success and Error Messages */}
            {loading && <Loader />}
            {error && !loading && <Error message="Registration failed. Please try again." />}
            {success && !loading && <Success message="Registration successful!" />}

            {/* Form Fields */}
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={Name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
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
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              value={cpassword}
              onChange={(e) => setCPassword(e.target.value)}
            />
            <button className="btn btn-primary" onClick={register}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registerscreen;
