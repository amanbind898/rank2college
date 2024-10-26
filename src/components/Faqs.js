"use client";
import './Faqs.css';
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const Faqs = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqsData = [
    {
      id: 1,
      question: 'What is the JEE Main College Predictor?',
      answer: 'The JEE Main College Predictor is a tool that helps you find the list of colleges you may be eligible for based on your JEE Main rank, category, and other preferences.'
    },
    {
      id: 2,
      question: 'At some ranks no college eligible is shown, Why?',
      answer: (
        <div className="space-y-4">
          <p>There could be several reasons why no colleges are shown as eligible for a particular rank:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-medium">High Rank:</span> Your rank might not be in the range of previous year OR-CR range, so no college is filtered. You can approximate your rank by +/- 100 ranks to get better results.
            </li>
            <li>
              <span className="font-medium">Data Limitations:</span> The predictions are based on the previous year's data (JoSAA 2024, 5th round). Admission trends and cutoffs can vary each year, and the current dataset might not cover all possible scenarios.
            </li>
            <li>
              <span className="font-medium">Filters:</span> The filters you selected (category, gender, college type) might limit the number of eligible colleges. Try adjusting the filters to see if more options become available.
            </li>
          </ul>
          <p>If you believe there is an error or need more information, please feel free to contact us at <a href="mailto:amanbind898@gmail.com" className="text-black-600 hover:underline">support@collegenexus</a>.</p>
        </div>
      )
    },
    {
      id: 3,
      question: 'How accurate is the prediction?',
      answer: 'The predictions are based on the data from JoSAA (2023) 6th round, and while they provide a good estimate, actual cutoffs may vary.'
    },
    {
      id: 4,
      question: 'Can I rely on this tool for my final college decision?',
      answer: 'This tool is intended to provide guidance. Always refer to the official sources and counseling sessions for final decisions.'
    },
    {
      id: 5,
      question: 'What if I encounter issues using the tool?',
      answer: 'If you encounter any issues or have any questions, please contact us at infincodes@gmail.com.'
    }
  ];

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 faq" id="faq-section">
      <div className='faq-instructions'>
      <h2>How to Use the JEE Main College Predictor</h2>
        <ol>
            <li>Enter your JEE Main rank in the "Your Rank" field.</li>
            <li>Select your category from the "Your Category" dropdown.</li>
            <li>Select the type of college you are interested in from the "Type of College" dropdown.</li>
            <li>Choose your gender from the "Select Gender" options.</li>
            <li>Click on the "Predict My Colleges" button to see the eligible colleges.</li>
        </ol>
      </div>
      <h2 className="text-xl font-bold mb-8 text-center text-black">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqsData.map(({ id, question, answer }) => (
          <div
            key={id}
            className="border border-black border-spacing-0.5 rounded-lg overflow-hidden shadow-sm"
           style={{backgroundColor: "#007bff"}}
          >
            <button
              onClick={() => toggleFaq(id)}
              className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-gray-50"
            >
              <span className="font-medium text-base">{question}</span>
              <ChevronDown 
                className={`w-5 h-5 transition-transform duration-200 ${
                  openFaq === id ? 'rotate-180' : ''
                }`}
              />
            </button>
            <div
              className={`px-6 overflow-hidden transition-all duration-200 ease-in-out ${
                openFaq === id 
                  ? 'max-h-96 py-4 opacity-100' 
                  : 'max-h-0 py-0 opacity-0'
              }`}
            >
              <div className="text-white text-base">
                {answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faqs;