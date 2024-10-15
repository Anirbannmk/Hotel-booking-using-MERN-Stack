import { useState,useEffect,useRef  } from 'react';
import './Mainscreen.css';
import {Link} from 'react-router-dom'
const App = () => {

  return (
<>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link
    href="https://cdn.jsdelivr.net/npm/remixicon@4.0.0/fonts/remixicon.css"
    rel="stylesheet"
  />
  <link rel="stylesheet" href="styles.css" />
  <title>Web Design Mastery | Rayal Park</title>
  <header className="header">
   
    <div className="section__container header__container" id="home">
      <p>Simple - Unique - Friendly</p>
      <h1>  
        Make Yourself At Home
        <br />
        In Our <span>Hotel</span><br/>
        <Link to="/home">
        <button className="btn nav__btn">Book Now</button>
        </Link>
      </h1>
    </div>
  </header>
  <section className="section__container booking__container">
    <form action="/" className="booking__form">
      <div className="input__group">
        <span>
          <i className="ri-calendar-2-fill" />
        </span>
        <div>
          <label htmlFor="check-in">CHECK-IN</label>
          <input type="text" placeholder="Check In" />
        </div>
      </div>
      <div className="input__group">
        <span>
          <i className="ri-calendar-2-fill" />
        </span>
        <div>
          <label htmlFor="check-out">CHECK-OUT</label>
          <input type="text" placeholder="Check Out" />
        </div>
      </div>
      <div className="input__group">
        <span>
          <i className="ri-user-fill" />
        </span>
        <div>
          <label htmlFor="guest">GUEST</label>
          <input type="text" placeholder="Guest" />
        </div>
      </div>
      <div className="input__group input__btn">
        <Link to="/home">
        <button className="btn">CHECH OUT</button>
        </Link>
      </div>
    </form>
  </section>
  <section className="section__container about__container" id="about">
    <div className="about__image">
      <img src="assets/about.jpg" alt="about" />
    </div>
    <div className="about__content">
      <p className="section__subheader">ABOUT US</p>
      <h2 className="section__header">The Best Holidays Start Here!</h2>
      <p className="section__description">
        With a focus on quality accommodations, personalized experiences, and
        seamless booking, our platform is dedicated to ensuring that every
        traveler embarks on their dream holiday with confidence and excitement.
      </p>
      <div className="about__btn">
        <button className="btn">Read More</button>
      </div>
    </div>
  </section>
  <section className="section__container room__container">
    <p className="section__subheader">OUR LIVING ROOM</p>
    <h2 className="section__header">
      The Most Memorable Rest Time Starts Here.
    </h2>
    <div className="room__grid">
      <div className="room__card">
        <div className="room__card__image">
          <img src="assets/room-1.jpg" alt="room" />
          <div className="room__card__icons">
            <span>
              <i className="ri-heart-fill" />
            </span>
            <span>
              <i className="ri-paint-fill" />
            </span>
            <span>
              <i className="ri-shield-star-line" />
            </span>
          </div>
        </div>
        <div className="room__card__details">
          <h4>Deluxe Ocean View</h4>
          <p>
            Bask in luxury with breathtaking ocean views from your private
            suite.
          </p>
          <h5>
            Starting from <span>$299/night</span>
          </h5>
          <Link to="/home">
        <button className="btn nav__btn">Book Now</button>
        </Link>
        </div>
      </div>
      <div className="room__card">
        <div className="room__card__image">
          <img src="assets/room-2.jpg" alt="room" />
          <div className="room__card__icons">
            <span>
              <i className="ri-heart-fill" />
            </span>
            <span>
              <i className="ri-paint-fill" />
            </span>
            <span>
              <i className="ri-shield-star-line" />
            </span>
          </div>
        </div>
        <div className="room__card__details">
          <h4>Executive Cityscape Room</h4>
          <p>
            Experience urban elegance and modern comfort in the heart of the
            city.
          </p>
          <h5>
            Starting from <span>$199/night</span>
          </h5>
          <Link to="/home">
        <button className="btn nav__btn">Book Now</button>
        </Link>
        </div>
      </div>
      <div className="room__card">
        <div className="room__card__image">
          <img src="assets/room-3.jpg" alt="room" />
          <div className="room__card__icons">
            <span>
              <i className="ri-heart-fill" />
            </span>
            <span>
              <i className="ri-paint-fill" />
            </span>
            <span>
              <i className="ri-shield-star-line" />
            </span>
          </div>
        </div>
        <div className="room__card__details">
          <h4>Family Garden Retreat</h4>
          <p>
            Spacious and inviting, perfect for creating cherished memories with
            loved ones.
          </p>
          <h5>
            Starting from <span>$249/night</span>
          </h5>
          <Link to="/home">
        <button className="btn nav__btn">Book Now</button>
        </Link>
        </div>
      </div>
    </div>
  </section>
  <section className="service" id="service">
    <div className="section__container service__container">
      <div className="service__content">
        <p className="section__subheader">SERVICES</p>
        <h2 className="section__header">Strive Only For The Best.</h2>
        <ul className="service__list">
          <li>
            <span>
              <i className="ri-shield-star-line" />
            </span>
            High Class Security
          </li>
          <li>
            <span>
              <i className="ri-24-hours-line" />
            </span>
            24 Hours Room Service
          </li>
          <li>
            <span>
              <i className="ri-headphone-line" />
            </span>
            Conference Room
          </li>
          <li>
            <span>
              <i className="ri-map-2-line" />
            </span>
            Tourist Guide Support
          </li>
        </ul>
      </div>
    </div>
  </section>
  <section className="section__container banner__container">
    <div className="banner__content">
      <div className="banner__card">
        <h4>25+</h4>
        <p>Properties Available</p>
      </div>
      <div className="banner__card">
        <h4>350+</h4>
        <p>Bookings Completed</p>
      </div>
      <div className="banner__card">
        <h4>600+</h4>
        <p>Happy Customers</p>
      </div>
    </div>
  </section>
  <section className="explore" id="explore">
    <p className="section__subheader">EXPLORE</p>
    <h2 className="section__header">What's New Today.</h2>
    <div className="explore__bg">
      <div className="explore__content">
        <p className="section__description">10th MAR 2023</p>
        <h4>A New Menu Is Available In Our Hotel.</h4>
        <button className="btn">Continue</button>
      </div>
    </div>
  </section>
  <footer className="footer" id="contact">
    <div className="section__container footer__container">
      <div className="footer__col">
        <div className="logo">
          <a href="#home">
            <img src="assets/logo.png" alt="logo" />
          </a>
        </div>
        <p className="section__description">
          Discover a world of comfort, luxury, and adventure as you explore our
          curated selection of hotels, making every moment of your getaway truly
          extraordinary.
        </p>
        <button className="btn">Book Now</button>
      </div>
      <div className="footer__col">
        <h4>QUICK LINKS</h4>
        <ul className="footer__links">
          <li>
            <a href="#">Browse Destinations</a>
          </li>
          <li>
            <a href="#">Special Offers &amp; Packages</a>
          </li>
          <li>
            <a href="#">Room Types &amp; Amenities</a>
          </li>
          <li>
            <a href="#">Customer Reviews &amp; Ratings</a>
          </li>
          <li>
            <a href="#">Travel Tips &amp; Guides</a>
          </li>
        </ul>
      </div>
      <div className="footer__col">
        <h4>OUR SERVICES</h4>
        <ul className="footer__links">
          <li>
            <a href="#">Concierge Assistance</a>
          </li>
          <li>
            <a href="#">Flexible Booking Options</a>
          </li>
          <li>
            <a href="#">Airport Transfers</a>
          </li>
          <li>
            <a href="#">Wellness &amp; Recreation</a>
          </li>
        </ul>
      </div>
      <div className="footer__col">
        <h4>CONTACT US</h4>
        <ul className="footer__links">
          <li>
            <a href="#">amaji4679@gamil.com</a>
          </li>
        </ul>
        <div className="footer__socials">
          <a href="#">
            <img src="assets/facebook.png" alt="facebook" />
          </a>
          <a href="#">
            <img src="assets/instagram.png" alt="instagram" />
          </a>
          <a href="#">
            <img src="assets/youtube.png" alt="youtube" />
          </a>
          <a href="#">
            <img src="assets/twitter.png" alt="twitter" />
          </a>
        </div>
      </div>
    </div>
    <div className="footer__bar">
      Copyright © 2023 Web Design Mastery. All rights reserved.
    </div>
  </footer>
</>

    );
  };
export default App;
