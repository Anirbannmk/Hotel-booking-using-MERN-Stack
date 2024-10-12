import React from 'react';
import './Navbar.css';

function Navbar() {
  const user = JSON.parse(localStorage.getItem('currentUser'));

  function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = './login';
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light custom-navbar">
        <a className="navbar-brand" href="/home">StaySphere</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"><i className="fa fa-bars" style={{ color: 'white' }}></i></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-1 mb-3">
            <li className="nav-item active">
              <a className="nav-link" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact">Contact</a>
            </li>
            {user && user.isAdmin && ( // Assuming you have a flag to check if the user is admin
              <li className="nav-item">
                <a className="nav-link" href="/admin">Admin</a>
              </li>
            )}
            {user ? (
              <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i className='fa fa-user'></i> {user.name}
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a className="dropdown-item" href="/profile">Profile</a>
                  <a className="dropdown-item" href="#" onClick={logout}>Logout</a>
                </div>
              </div>
            ) : (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/register">Register</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/login">Login</a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
