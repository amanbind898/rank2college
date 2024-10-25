"use client";
import React from 'react';

export default function GoDownButton() {
  const scrollToNextSection = () => {
    const nextSection = document.querySelector("#footer");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={scrollToNextSection}
      className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg focus:outline-none transition-transform transform hover:scale-105"
      aria-label="Go Down"
    >
      ↓
    </button>
  );
}
