import React, { useEffect, useState } from 'react';
import './contact.css';
import contactimg from './contact.png';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const [error, setError] = useState(null);
  useEffect(() => {
    const initMap = () => {
      const location = { lat: 30.8747791, lng: 76.8612745 };
      const map = new window.google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: location,
      });
      new window.google.maps.Marker({
        position: location,
        map: map,
      });
    };

    const loadScript = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCYItez7saoSZBTwlIB3E_a1DsODBoOiIw&callback=initMap`;

      script.async = true;
      script.onload = () => {
        console.log("Google Maps script loaded successfully!");
      };
      document.body.appendChild(script);
      window.initMap = initMap;
    };

    loadScript();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/contact', formData);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
      });
      setError(null);
      alert('Message sent successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Failed to send message. Please try again later.');
    }
  };

  return (
    <section className="contact-section">
      <div className="contact-bg">
        <h3>Get in Touch with Us</h3>
        <h2>Contact Us</h2>
        <div className="line">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <p className="text">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda
          iste facilis quos impedit fuga nobis modi debitis laboriosam velit
          reiciendis quisquam alias corporis, maxime enim, optio ab dolorum
          sequi qui.
        </p>
      </div>

      <div className="contact-body">
        <div className="contact-info">
          <div>
            <span>
              <i className="fas fa-mobile-alt"></i>
            </span>
            <span className="span">Phone No.</span>
            <span className="text">8777721438</span>
          </div>
          <div>
            <span>
              <i className="fas fa-envelope-open"></i>
            </span>
            <span className="span">E-mail</span>
            <span className="text">amaji4679@gmail.com</span>
          </div>
          <div>
            <span>
              <i className="fas fa-map-marker-alt"></i>
            </span>
            <span className="span">Address</span>
            <span className="text">Kalka, Himachal Pradesh, India</span>
          </div>
          <div>
            <span>
              <i className="fas fa-clock"></i>
            </span>
            <span className="span">Opening Hours</span>
            <span className="text">Monday - Friday (9:00 AM to 5:00 PM)</span>
          </div>
        </div>

        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="firstName"
                className="form-control"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="lastName"
                className="form-control"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="E-mail"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="text"
                name="phone"
                className="form-control"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <textarea
              rows="5"
              name="message"
              placeholder="Message"
              className="form-control"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            <input type="submit" className="send-btn" value="Send Message" />
            {error && <div className="error">{error}</div>}
          </form>

          <div>
            <img src={contactimg} alt="Contact" />
          </div>
        </div>
      </div>

      <div className="map" id="map" style={{ width: '100%', height: '450px' }}></div>

      <div className="contact-footer">
        <h3>Follow Us</h3>
        <div className="social-links">
          <a href="#" className="fab fa-facebook-f"></a>
          <a href="#" className="fab fa-twitter"></a>
          <a href="#" className="fab fa-instagram"></a>
          <a href="#" className="fab fa-linkedin"></a>
          <a href="#" className="fab fa-youtube"></a>
        </div>
      </div>
    </section>
  );
};

export default Contact;


//     