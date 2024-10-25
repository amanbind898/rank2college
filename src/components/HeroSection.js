// components/HeroSection.js
'use client';
import './HeroSection.css';

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Rank2College</h1>
        <h2 className="hero-subtitle">JEE Main 2025 College Predictor</h2>
    
        <p>Data Source: JoSAA (2024) 5th round</p>
        <p className="hero-description">
          Built using the latest data from official government websites, this predictor is 
          <span className="highlight"> free</span>, 
          <span className="highlight"> reliable</span>, and 
          <span className="highlight"> easy to use</span>.
        </p>
        <p className="hero-extra">No login required and no data tracking!</p>
        <button className="hero-button" onClick={() => window.location.href = '#predictor'}>
          Try It Now
        </button>
      </div>
    </section>
  );
}
