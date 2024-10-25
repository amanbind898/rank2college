'use client';
//css 
import './page.css';
import { useState } from 'react';
import GoDownButton from '@/components/GoDownButton';
import { toast } from 'react-toastify';

//how to know path of this page

export default function Home() {
  const [formData, setFormData] = useState({
    rank: '',
    seatType: 'OPEN',
    collegeType: 'all',
    domicile: 'all',
    gender: 'Gender-Neutral',
  });
  const [eligibleColleges, setEligibleColleges] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [eligibleMessage, setEligibleMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const predictCollege = async () => {
    setError('');
    setEligibleColleges([]);
    
    setIsLoading(true);

    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (!data.eligibleColleges || data.eligibleColleges.length === 0) {
        setEligibleMessage('No eligible colleges found for the given rank. Redirecting to the FAQ section.');
        setTimeout(() => window.location.href = "#faq-section", 1000);
      } else {
        displayResults(data.eligibleColleges);
      }
    } catch (error) {
      setError('Error fetching data');
      toast.error("An error occurred. Please try again.");

      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  function displayResults(colleges) {
    const filteredColleges = colleges.filter(college => college); // Remove any null values
    
    if (!filteredColleges || filteredColleges.length === 0) {
      setEligibleMessage('No eligible colleges found for the given rank. Redirecting to the FAQ section for more information.');
      setTimeout(() => window.location.href = "#faq-section", 1000);
      return;
    }
  
    if (formData.domicile === 'all') {
      setEligibleMessage(`Showing ${filteredColleges.length} eligible options.`);
      setEligibleColleges(filteredColleges);
    } else {
      // Split colleges into home state and other state
      const homeStateColleges = filteredColleges.filter(
        college => college['Quota'] === 'HS' && college['State'] === formData.domicile
      );
      
      const otherStateColleges = filteredColleges.filter(
        college => !(college['Quota'] ==='HS' )
      );
  
      // Create the eligibility message
      const message = `Showing ${homeStateColleges.length+otherStateColleges.length} eligible options. The data is taken from the official JoSAA website and is updated till 2024 round 5.<br><br>` +
        `Please note:<br>` +
        `1. Since you have selected your home state (domicile) as ${formData.domicile}, only HOME STATE (HS) quota colleges in ${formData.domicile} are shown first. HS quota for other states is not displayed.<br>` +
        `2. If you do not see any colleges in your home state, it means you're not eligible for the colleges as per applied filters and CRL under HS quota. Eligible colleges from other states will be displayed if any.`;
  
      setEligibleMessage(message);
  
      // Combine colleges with headers using special marker objects
      const combinedColleges = [];
      
      if (homeStateColleges.length > 0) {
        combinedColleges.push({
          isHeader: true,
          text: `Home State Colleges (${formData.domicile})`
        });
        combinedColleges.push(...homeStateColleges);
      } else {
        combinedColleges.push({
          isHeader: true,
          text: `No colleges found in your home state (${formData.domicile}) under HOME STATE (HS) quota.`
        });
      }
  
      if (otherStateColleges.length > 0) {
        combinedColleges.push({
          isHeader: true,
          text: 'Other State Colleges'
        });
        combinedColleges.push(...otherStateColleges);
      }
  
      setEligibleColleges(combinedColleges);
    }
  }

  // Function to calculate probability based on ranks
  const calculateProbability = (openingRank, closingRank, userRank) => {
    const range = closingRank - openingRank;
    const position = userRank - openingRank;

    if (position < 0) return 'Very High';
    if (position < range * 0.25) return 'High';
    if (position < range * 0.75) return 'Medium';
    return 'Low';
  };

  // Function to get CSS className based on probability
  const getProbabilityClass = (probability) => {
    switch (probability) {
      case 'Very High':
        return 'very-high-probability';
      case 'High':
        return 'high-probability';
      case 'Medium':
        return 'medium-probability';
      case 'Low':
        return 'low-probability';
      default:
        return '';
    }
  };
  return (
    <div className="grid place-items-center justify-center">
    

      <div className="form-container">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="rank">Your Rank :</label>
            <input
              type="number"
              id="rank"
              name="rank"
              placeholder="Enter Your Category rank"
              value={formData.rank}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="seatType">Your Category</label>
            <select id="seatType" name="seatType" value={formData.seatType} onChange={handleChange}>
              <option value="OPEN">OPEN</option>
              <option value="OPEN (PwD)">Open-PwD</option>
              <option value="OBC-NCL">OBC-NCL</option>
              <option value="OBC-NCL (PwD)">OBC-NCL-PwD</option>
              <option value="SC">SC</option>
              <option value="SC (PwD)">SC-PwD</option>
              <option value="ST">ST</option>
              <option value="ST (PwD)">ST-PwD</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="collegeType">Type of College : NIT/IIIT/GFTI</label>
            <select
              id="collegeType"
              name="collegeType"
              value={formData.collegeType}
              onChange={handleChange}
            >
              <option value="all">All Colleges</option>
              <option value="NIT">National Institute of Technology</option>
              <option value="IIIT">Indian Institute of Information Technology</option>
              <option value="GFTI">Government Funded Technical Institute</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="domicile">Select State</label>
            <select id="domicile" name="domicile" value={formData.domicile} onChange={handleChange}>
              <option value="all">All States</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Bihar">Bihar</option>
              <option value="Chandigarh">Chandigarh</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                        <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Manipur">Manipur</option>
                        <option value="Meghalaya">Meghalaya</option>
                        <option value="Mizoram">Mizoram</option>
                        <option value="Nagaland">Nagaland</option>
                        <option value="Odisha">Odisha</option>
                        <option value="Puducherry">Puducherry</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Sikkim">Sikkim</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Tripura">Tripura</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Uttarakhand">Uttarakhand</option>
                        <option value="West Bengal">West Bengal</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="gender">Select Gender :</label>
            <div>
              <input
                type="radio"
                id="genderNeutral"
                name="gender"
                value="Gender-Neutral"
                checked={formData.gender === 'Gender-Neutral'}
                onChange={handleChange}
              />
              <label htmlFor="genderNeutral">Gender-Neutral</label>
              <input
                type="radio"
                id="femaleOnly"
                name="gender"
                value="Female-only (including Supernumerary)"
                checked={formData.gender === 'Female-only (including Supernumerary)'}
                onChange={handleChange}
              />
              <label htmlFor="femaleOnly">Female-only</label>
            </div>
          </div>
          <GoDownButton />
          <button className='btn' type="button" onClick={predictCollege} disabled={isLoading}>
            {isLoading ? 'Predicting...' : 'Predict My Colleges'}
          </button>
        </form>
      </div>

      
      {error && <p style={{ color: 'red' }}>{error}</p>}


{/* Results Message */}
<div id="result-box">

<div id="eligiblemsg" dangerouslySetInnerHTML={{ __html: eligibleMessage }}></div>
<h2>Eligible Colleges: </h2>
<ul id="results">
  {eligibleColleges.length > 0 ? (
    eligibleColleges.map((college, index) => {
      if (college.isHeader) {
        return <h3 key={`header-${index}`}>{college.text}</h3>;
      }

      const userRank = parseInt(formData.rank, 10);
      const openingRank = parseInt(college['Opening Rank'], 10);
      const closingRank = parseInt(college['Closing Rank'], 10);

      const probability = calculateProbability(openingRank, closingRank, userRank);
      const probabilityClass = getProbabilityClass(probability);

      return (
        <li key={index} className="college-list-item">
         
          <strong id="rd">{college['Institute Type']}</strong> - <span className="institute-name">{college['Institute']}</span>
          <br/><span className="branch">{college['Academic Program Name']}</span>
          <br/><span className="detail">Quota: {college['Quota']}</span>
          <br/><span className="detail">Seat Type: {college['Seat Type']}</span>
          <br/><span className="detail">Gender: {college['Gender']}</span>
          <br/><span className="detail">Opening Rank: {college['Opening Rank']}</span>
          <br/><span className="detail">Closing Rank: {college['Closing Rank']}</span>
          <span className={`probability-tag ${probabilityClass}`}>{probability}</span>
        </li>
      );
    })
  ) : (
    <p>College list will show here</p>
  )}
</ul>
</div>
</div>

);
}