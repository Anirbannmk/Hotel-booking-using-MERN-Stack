import React from 'react';
import './contact.css'; // Assuming you have your CSS in this file

const ContactUs = () => {
  return (
    <>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <title>Contact Us</title>
      <meta name="description" content="" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" href="style.css" />
      {/* Fontawesome icon */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
        integrity="sha512-+4zCK9k+qNFUR5X+cKL9EIR+ZOhtIloNl9GIKS57V1MyNsYpYcUrUeQc9vNfzsWfV28IaLL3i96P9sdNyeRssA=="
        crossOrigin="anonymous"
      />

      <section className="contact-section">
        <div className="contact-bg">
          <h3>Get in Touch with Us</h3>
          <h2>Contact Us</h2>
          <div className="line">
            <div />
            <div />
            <div />
          </div>
          <p className="text">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda iste
            facilis quos impedit fuga nobis modi debitis laboriosam velit reiciendis
            quisquam alias corporis, maxime enim, optio ab dolorum sequi qui.
          </p>
        </div>
        <div className="contact-body">
          <div className="contact-info">
            <div>
              <span>
                <i className="fas fa-mobile-alt" />
              </span>
              <span className="span">Phone No.</span>
              <span className="text">8777721438</span>
            </div>
            <div>
              <span>
                <i className="fas fa-envelope-open" />
              </span>
              <span className="span">E-mail</span>
              <span className="text">amaji4679@gmail.com</span>
            </div>
            <div>
              <span>
                <i className="fas fa-map-marker-alt" />
              </span>
              <span className="span">Address</span>
              <span className="text">Kalka, Himachal Pradesh, India</span>
            </div>
            <div>
              <span>
                <i className="fas fa-clock" />
              </span>
              <span className="span">Opening Hours</span>
              <span className="text">Monday - Friday (9:00 AM to 5:00 PM)</span>
            </div>
          </div>
          <div className="contact-form">
            <form>
              <div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="First Name"
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last Name"
                />
              </div>
              <div>
                <input type="email" className="form-control" placeholder="E-mail" />
                <input type="text" className="form-control" placeholder="Phone" />
              </div>
              <textarea
                rows={5}
                placeholder="Message"
                className="form-control"
              />
              <input
                type="submit"
                className="send-btn"
                value="Send Message"
              />
            </form>
            <div>
              <img src="contact.jpg" alt="contact" />
            </div>
          </div>
        </div>
        <div className="map" id="map" style={{ width: "100%", height: 450 }} />
        <div className="contact-footer">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a href="#" className="fab fa-facebook-f" />
            <a href="#" className="fab fa-twitter" />
            <a href="#" className="fab fa-instagram" />
            <a href="#" className="fab fa-linkedin" />
            <a href="#" className="fab fa-youtube" />
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
