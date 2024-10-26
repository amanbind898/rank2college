import React from 'react';
import './Footer.css'; // Ensure to create a CSS file for styling the footer
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

function Footer() {
  return (
    <div id='footer' className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>About Us</h3>
          <p>
          Rank2College is a powerful college predictor tool specifically designed for JEE Main 2025 candidates. It uses user rank, category, domicile, and other preferences to filter eligible colleges from the official JoSAA 2024 data. With a streamlined UI and detailed results, it provides students with a reliable reference for college admissions.
            <br />
            Stay connected with us for the latest updates and information.
          </p>
        </div>
        
        <div className="footer-section links">
          <h3>Important Links</h3>
          <ul>
            <li><a href="/index.html">Home</a></li>
            <li><a href="https://college-nexus.onrender.com/#contact">Contact</a></li>
            <li><a href="https://college-nexus.onrender.com/pages/privacypolicy.html">Privacy Policy</a></li>
          </ul>
        </div>
        
        <div className="footer-section social-icons">
          <h3>Follow us on:</h3>
          <div className='social-icons-group'>
          <a href="#" className="icon"><FaFacebookF /></a>
          <a href="https://x.com/akb898" className="icon"><FaTwitter /></a>
          <a href="https://www.instagram.com/infincodes/" className="icon"><FaInstagram /></a>
          <a href="https://www.linkedin.com/in/aman-bind-306152289" className="icon"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        &copy; 2024 Rank2College by Aman Bind. All rights reserved.
      </div>
    </div>
  );
}

export default Footer;
