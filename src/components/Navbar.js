"use client";
import React, { useState } from 'react';
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="logo">
          <h1>Rank2College</h1>
        </div>
      </div>
      <div className="navbar-right">
        <button className="hamburger" onClick={toggleMenu}>
          &#9776;
        </button>
        <nav className={`nav-links ${isOpen ? 'open' : ''}`}>
          <a href="#home">Home</a>
          <a href="#predictor">Predictor</a>
          <a href="#faq-section">FAQ</a>
          <a href="#footer">Contact</a>
        </nav>
      </div>
    </div>
  );
}
