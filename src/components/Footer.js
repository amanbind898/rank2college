import React from 'react';
import './Footer.css'; // Ensure to create a CSS file for styling the footer
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

function Footer() {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>About Us</h3>
          <p>
            College Nexus is your ultimate guide to finding the best colleges and programs.
            <br />
            Stay connected with us for the latest updates and information.
          </p>
        </div>
        
        <div className="footer-section links">
          <h3>Important Links</h3>
          <ul>
            <li><a href="/index.html">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="https://college-nexus.onrender.com/#contact">Contact</a></li>
            <li><a href="/pages/privacypolicy.html">Privacy Policy</a></li>
          </ul>
        </div>
        
        <div className="footer-section social-icons">
          <h3>Follow us on:</h3>
          <div className='social-icons-group'>
          <a href="#" className="icon"><FaFacebookF /></a>
          <a href="#" className="icon"><FaTwitter /></a>
          <a href="https://www.instagram.com/infincodes/" className="icon"><FaInstagram /></a>
          <a href="https://www.linkedin.com/in/aman-bind-306152289" className="icon"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        &copy; 2024 College Nexus by Aman Bind. All rights reserved.
      </div>
    </div>
  );
}

export default Footer;
